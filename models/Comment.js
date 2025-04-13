const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const User = require("./User");
const Event = require("./Event");

const Comment = sequelize.define(
  "Comment",
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
    parent_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Comment,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Events",
  }
);

module.exports = Comment;

Comment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });

Comment.belongsTo(Event, { foreignKey: "event_id" });
Event.hasMany(Comment, { foreignKey: "event_id" });

Comment.belongsTo(Comment, { foreignKey: "parent_id" });
Comment.hasMany(Comment, { foreignKey: "parent_id" });
