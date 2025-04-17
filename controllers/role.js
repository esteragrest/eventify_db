const RoleService = require("../services/role");

class RoleController {
  async getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();

      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RoleController()