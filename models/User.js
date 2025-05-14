const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Role = require("./Role");

const User = sequelize.define(
  "User",
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
    birth_date: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    photo: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      references: {
        model: Role,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });
