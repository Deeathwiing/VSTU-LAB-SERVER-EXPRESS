const { Op } = require("sequelize"),
  models = require("../init/models"),
  sequelize = require("../init/sequelize"),
  CustomError = require("../helpers/customError");

class ProductRepository {
  async findAllPagination(amount, withImg, sortByName, sortByDate, page) {
    try {
      let offset = Number(amount * (Math.floor(page) - 1));

      if (offset < 0) offset = 0;

      const whereOptionsFunc = () => {
        if (withImg == true) {
          return {
            picture: {
              [Op.not]: [{}, []]
            }
          };
        }

        return null;
      };

      const whereOptions = whereOptionsFunc();

      const orderOptionsFunc = () => {
        if (sortByName == true) {
          return [
            ["title", "desc"],
            ["amount", "desc"]
          ];
        }

        if (sortByDate == true) {
          return [
            ["updatedAt", "desc"],
            ["amount", "desc"]
          ];
        }

        return [["amount", "desc"]];
      };

      const orderOptions = orderOptionsFunc();

      const productsWithRating = await models.Product.findAll({
        subQuery: false,

        offset,

        limit: Number(amount),

        where: whereOptions,

        order: orderOptions,

        attributes: [
          "id",
          "price",
          "title",
          "amount",
          "description",
          "picture",
          "createdAt",
          "updatedAt",

          [
            sequelize.fn("avg", sequelize.col("ratings.ratingValue")),
            "averageRating"
          ],

          [
            sequelize.fn("count", sequelize.col("ratings.ratingValue")),
            "amountOfRatings"
          ]
        ],

        include: [
          {
            model: models.Rating,
            attributes: []
          }
        ],

        group: ["product.id"]
      });

      if (!productsWithRating)
        throw new CustomError(
          "findAllPaginationError",
          404,
          "Products with Rating not found"
        );

      const productsWithTags = await models.Product.findAll({
        offset,

        limit: Number(amount),

        where: whereOptions,

        order: orderOptions,

        attributes: [
          "id",
          "price",
          "title",
          "amount",
          "description",
          "picture",
          "createdAt",
          "updatedAt"
        ],

        include: [
          {
            model: models.Tag,
            attributes: ["text"]
          }
        ],

        group: ["product.id"]
      });

      if (!productsWithTags)
        throw new CustomError(
          "findAllPaginationError",
          404,
          "Products with Tags not found"
        );

      let products = productsWithTags.map(function(item, i, arr) {
        try {
          let items = item.dataValues;

          let foundedProduct = productsWithRating.find(
            product => product.dataValues.id == items.id
          );

          let averageRating = foundedProduct.dataValues.averageRating;

          let amountOfRatings = foundedProduct.dataValues.amountOfRatings;

          items.averageRating = averageRating;

          items.amountOfRatings = amountOfRatings;

          return items;
        } catch (e) {
          throw new CustomError(
            "mergedArrError",
            404,
            "Problem with merged array"
          );
        }
      });

      return products;
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }

  async createProduct(data, image, protocol, host) {
    const url = protocol + "://" + host;

    let newProduct;

    try {
      if (image) {
        newProduct = await models.Product.create({
          picture: url + "/static/productImages/" + image.filename,
          title: data.title,
          description: data.description,
          price: data.price,
          amount: data.amount
        });
      } else {
        newProduct = await models.Product.create({
          picture: "",
          title: data.title,
          description: data.description,
          price: data.price,
          amount: data.amount
        });
      }

      if (!newProduct)
        throw new CustomError("createProductError", 404, "Product not created");

      const arrayOfTags = data.tags.split(",");

      arrayOfTags.forEach(async element => {
        const tag = await models.Tag.create({ text: element });

        if (!tag)
          throw new CustomError("createProductError", 404, "Tag not created");

        const result = await newProduct.addTag(tag);

        if (!result)
          throw new CustomError(
            "createProductError",
            404,
            "Tag not added to product"
          );
      });
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }

  async updateProduct(data) {
    try {
      const result = await models.Product.update(
        {
          picture: data.picture,
          title: data.title,
          description: data.description,
          price: data.price,
          tags: data.tags,
          amount: data.amount
        },

        { where: { id: data.id } }
      );

      if (!result)
        throw new CustomError("updateProductError", 404, "Product not updated");
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }

  async deleteProduct(id) {
    try {
      const result = await models.Product.destroy({ where: { id } });

      if (!result)
        throw new CustomError("deleteProductError", 404, "Product not deleted");
    } catch (e) {
      if (e instanceof CustomError) throw e;

      throw new CustomError("undefined error", 400, "Something wrong");
    }
  }
}

module.exports = new ProductRepository();
