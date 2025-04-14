// Put users/role/:id – изменение роли пользователя (админ)
// Delete /users/:id – удаление пользователя (сам пользователь, админ)

const express = require("express");
const UserController = require("../controllers/user");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const router = express.Router();

router.get("/", isAuthenticated, isAdmin, UserController.getAllUsers);

router.get("/profile", isAuthenticated, UserController.getCurrentUser);

router.put("/edit", isAuthenticated, UserController.updateUser);

module.exports = router;
