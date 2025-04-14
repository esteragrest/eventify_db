const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./User");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    event_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM("open", "closed"),
      allowNull: false,
    },
    payment: {
      type: DataTypes.ENUM("paid", "free"),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    age_limit: {
      type: DataTypes.ENUM("no_limit", "14+", "16+", "18+"),
      allowNull: false,
    },
    max_participants: {
      type: DataTypes.INTEGER,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "events",
  }
);

module.exports = Event;

Event.belongsTo(User, { foreignKey: "organizer_id" });
User.hasMany(Event, { foreignKey: "organizer_id" });
