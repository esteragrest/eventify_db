const { Sequelize } = require("sequelize");
const config = require("../config/sequelize");

const sequelize = new Sequelize("db_eventify", "postgres", "postgres", config);

module.exports = sequelize;
