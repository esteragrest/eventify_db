const express = require("express")
const RoleController = require("../controllers/role")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const isAdmin = require("../middlewares/isAdmin")

router.get('/', isAuthenticated, isAdmin, RoleController.getAllRoles)

module.exports = router