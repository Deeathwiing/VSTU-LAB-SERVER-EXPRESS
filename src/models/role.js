const RoleModel = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    userRole: {
      type: Sequelize.STRING
    }
  });
  return Role;
};
module.exports = { RoleModel };
