const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");

class DataBase {
  async connect() {
    try {
      await sequelize.sync();
      console.log("DB connected");
      
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = new DataBase();
