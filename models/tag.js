export const TagModel = (sequelize, Sequelize) => {
  const Tag = sequelize.define("tag", {
    text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return Tag;
};
