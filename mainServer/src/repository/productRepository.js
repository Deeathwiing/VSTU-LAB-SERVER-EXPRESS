const { Op } = require("sequelize"),
  models = require("../init/models"),
  sequelize = require("../init/sequelize"),
  CustomError = require("../helpers/customError");

class ProductRepository {
  async findAllPagination(
    amount,
    withImg,
    sortByName,
    sortByDate,
    page,
    title,
    tagId
  ) {
    try {
      let offset = Number(amount * (Math.floor(page) - 1));

      if (offset < 0) offset = 0;

      if (withImg === "true") {
        withImg = true;
      } else withImg = false;

      const whereOptionsFunc = () => {
        let options = {};

        if (withImg === true) {
          options.picture = {
            [Op.not]: ""
          };
        }

        if (title !== "none") {
          options.title = { [Op.regexp]: title };
        }

        return options;
      };

      let whereOptions = whereOptionsFunc();

      const whereOptionsTagsFunc = () => {
        let options = {};

        if (tagId !== "none") {
          options.id = Number(tagId);
        }

        return options;
      };

      let whereOptionsTags = whereOptionsTagsFunc();

      console.log(whereOptionsTags);

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

      const products = await models.Product.findAll({
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
            required: false,
            attributes: []
          },
          {
            model: models.Tag,
            attributes: ["text", "id"],
            through: {
              attributes: []
            },
            where: whereOptionsTags
          }
        ],

        group: [
          "id",
          "price",
          "title",
          "amount",
          "description",
          "picture",
          "createdAt",
          "updatedAt",
          "text",
          "product.id",
          "tags.id"
        ]
      });

      if (!products)
        throw new CustomError(
          "findAllPaginationError",
          404,
          "Error with request from products"
        );

      return products;
    } catch (e) {
      console.log(e);
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
        let result;
        const findedTag = await models.Tag.findAll({
          where: { text: element }
        });

        if (findedTag) {
          result = await newProduct.addTag(findedTag);
          if (!result)
            throw new CustomError(
              "createProductError",
              404,
              "Tag not added to product"
            );
          return;
        }

        const tag = await models.Tag.create({ text: element });

        if (!tag)
          throw new CustomError("createProductError", 404, "Tag not created");

        result = await newProduct.addTag(tag);

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

  async updateProduct(data, image, protocol, host) {
    const url = protocol + "://" + host;

    let newProduct;
    try {
      if (image) {
        newProduct = await models.Product.update(
          {
            picture: url + "/static/productImages/" + image.filename,
            title: data.title,
            description: data.description,
            price: data.price,
            amount: data.amount
          },

          { where: { id: data.id } }
        );
      } else {
        newProduct = await models.Product.update(
          {
            picture: "",
            title: data.title,
            description: data.description,
            price: data.price,
            amount: data.amount
          },

          { where: { id: data.id } }
        );
      }
      if (!newProduct)
        throw new CustomError("updateProductError", 404, "Product not updated");

      const product = await models.Product.findOne({ where: { id: data.id } });

      const arrayOfTags = data.tags.split(",");

      arrayOfTags.forEach(async element => {
        const tag = await models.Tag.create({ text: element });

        if (!tag)
          throw new CustomError("createProductError", 404, "Tag not created");

        const result = await product.addTag(tag);

        if (!result)
          throw new CustomError(
            "updateProductError",
            404,
            "Tag not added to product"
          );
      });
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
