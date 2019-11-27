import mongoose from "mongoose";
import config from "../etc/config.json";
import Sequelize from "sequelize";
import "./models";
import { initModels } from "./models";
import { initRelations } from "./relations.js";
import { initRep } from "./repositories.js";

export const sequelize = new Sequelize("omVapeShop", "root", "12345678", {
  host: "localhost",
  dialect: "mysql"
});

export const models = initModels(sequelize, Sequelize);
initRelations(models);
initRep(models, sequelize);

export const setUpConnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully(sql).");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    })
    .then(
      sequelize.sync().then(result => {
        console.log("Run");
      })
    )
    .then(
      mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
      )
    )
    .then(() =>
      console.log("Connection has been established successfully(mongo)")
    )
    .catch(err => console.log(err));
};
