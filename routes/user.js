const express = require("express");
const UserController = require("../controllers/user");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.get("/", isAuthenticated, isAdmin, UserController.getAllUsers);

router.get("/profile", isAuthenticated, UserController.getCurrentUser);

router.get("/profile/:userId", UserController.getUserProfileById);

router.put("/edit", isAuthenticated, UserController.updateUser);

router.patch(
  "/role/:id",
  isAuthenticated,
  isAdmin,
  UserController.updateUserRole
);

router.delete("/:id", isAuthenticated, UserController.deleteUser);

module.exports = router;
