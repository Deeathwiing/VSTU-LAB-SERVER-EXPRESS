import sequelize from "./init/dataBaseUtils";

export const Rating = sequelize.define("rating", {
  ratingValue: {
    type: Sequelize.INTEGER
  }
});

/*
След баг в repositories => ratingRep.js => addRating. Проблема с upsert,постоянно 
добавляет поля,вместо того чтобы обновлять 
*/
