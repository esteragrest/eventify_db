const UserService = require("../services/user");
const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");
const ROLES = require("../constans/roles");

class UserController {
  async createUser(req, res) {
    try {
      const { password, role_id, ...userData } = req.body;

      if (role_id === ROLES.admin && req.user.role_id !== ROLES.admin) {
        return res.status(403).json({
          message: "Forbidden: Only admins can create other admins.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserData = {
        ...userData,
        password: hashedPassword,
        role_id: role_id || ROLES.user,
      };

      const newUser = await UserService.createUser(newUserData);

      const token = generate({ id: newUser.id, roleId: newUser.role_id });

      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ error: "User not Found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generate({ id: user.id, roleId: user.role_id });

      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async logoutUser(req, res) {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = new UserController();
