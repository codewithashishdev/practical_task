"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const constant = require("../../../configs/constant");

const db = {};
const sequelize = new Sequelize(
  constant.database,
  constant.username,
  constant.password,
  {
    host: constant.db_host.host,
    dialect: constant.db_host.dialect,
    port: constant.db_host.port
  },
);

fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
  .authenticate()
  .then(() => {
      console.log("DB Connection has been established successfully.");
  })
  .catch((err) => {
      console.error("Unable to connect to the Users DB:", err);
  });


  
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;