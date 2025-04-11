const { Sequelize } = require("sequelize");
const config = require("../config/sequelize");

const sequelize = new Sequelize("eventify_db", "postgres", "postgres", config);

module.exports = sequelize;
