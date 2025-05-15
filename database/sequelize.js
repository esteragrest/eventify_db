const { Sequelize } = require('sequelize');
const config = require('../config/sequelize');

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASSWORD,
	config
);

module.exports = sequelize;
