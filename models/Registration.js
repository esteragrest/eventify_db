const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./User");
const Event = require("./Event");

const Registration = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    participants_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "registrations",
  }
);

module.exports = Registration;

Registration.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Registration, { foreignKey: "user_id" });

Registration.belongsTo(Event, { foreignKey: "event_id" });
Event.hasMany(Registration, { foreignKey: "event_id" });
