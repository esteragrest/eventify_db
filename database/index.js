const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");

class DataBase {
  async connect() {
    try {
      await sequelize.sync();
      console.log("DB connected");

    //   const adminEmail = "admin@example.com";
    //   const adminPassword = "adminPassword";

      //const adminExists = await User.findOne({ where: { email: adminEmail } });

      //   if (!adminExists) {
      //     const hashedPassword = await bcrypt.hash(adminPassword, 10);

      //     await User.create({
      //       login: "admin",
      //       nickname: "Administrator",
      //       email: adminEmail,
      //       password: hashedPassword,
      //       is_admin: true,
      //     });

      //     console.log("Admin user created");
      //   } else {
      //     console.log("Admin user already exists");
      //   }
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = new DataBase();
