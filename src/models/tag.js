const sequelize = require("../init/sequelize");
const Sequelize = require("sequelize");

const TagModel = sequelize.define("tag", {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = TagModel;
