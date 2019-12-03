const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    deleteAccountRequest: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return User;
};

module.exports = { UserModel };
