const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./User");
const Event = require("./Event");

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Ratings",
    timestamps: false,
  }
);

module.exports = Rating;

Rating.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Rating, { foreignKey: "user_id" });

Rating.belongsTo(Event, { foreignKey: "event_id" });
Event.hasMany(Rating, { foreignKey: "event_id" });
