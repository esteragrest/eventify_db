const UserService = require("../services/user");
const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");
const ROLES = require("../constans/roles");
const mapUser = require("../helpers/mapUser");

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

      res.status(201).json({ user: mapUser(newUser) });
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

      res.status(200).json({ user: mapUser(user) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async logoutUser(req, res) {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ message: "Logout successful" });
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users.map(mapUser));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const { id } = req.user;
      const userWithStats = await UserService.getCurrentUser(id);

      if (!userWithStats || !userWithStats.user) {
        return res.status(404).json({ error: "User not Found" });
      }

      res.status(200).json({
        user: mapUser(userWithStats.user),
        countUserEvents: userWithStats.countUserEvents,
        countOfEventsAttended: userWithStats.countOfEventsAttended,
      });
    } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.user;
      const updateData = req.body;

      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not Found" });
      }

      if (user.id !== id && Number(req.user.roleId) !== ROLES.admin) {
        return res.status(403).json({
          message: "Forbidden: You do not have permission to update this user.",
        });
      }

      if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        updateData.password = hashedPassword;
      }

      if (updateData.roleId && updateData.roleId === ROLES.admin) {
        return res.status(403).json({
          message: "Forbidden: Only admins can create other admins.",
        });
      }

      await UserService.updateUser(id, updateData);

      res.status(200).json({
        message: "User updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async updateUserRole(req, res) {
    try {
      const { id } = req.params;
      const { roleId } = req.body;

      if (!roleId) {
        return res.status(400).json({ error: "Role ID is required." });
      }

      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      await UserService.updateUserRole(id, roleId);

      res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update role." });
    }
  }

  async deleteUser(req, res) {
    try {
      const targetUserId = Number(req.params.id);
      const currentUserId = req.user.id;
      const roleId = req.user.roleId;

      if (targetUserId !== currentUserId && roleId !== ROLES.admin) {
        return res.status(403).json({
          message: "Forbidden: You do not have permission to delete this user.",
        });
      }

      const user = await UserService.getUserById(targetUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      await UserService.deleteUser(targetUserId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      res.status(500).json({ error: "Failed to delete user." });
    }
  }
}

module.exports = new UserController();
