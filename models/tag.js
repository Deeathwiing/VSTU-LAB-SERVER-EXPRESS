export const TagModel = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
    text: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return Tag;
};
