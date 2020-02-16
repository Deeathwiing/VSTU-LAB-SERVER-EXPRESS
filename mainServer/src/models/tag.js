const sequelize = require("../init/sequelize"),
  Sequelize = require("sequelize");

const TagModel = sequelize.define("tag", {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = TagModel;
