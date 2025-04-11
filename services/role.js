const RoleRepository = require("../models/Role");

class RoleService {
  async getAllRoles() {
    return await RoleRepository.list();
  }
}

module.exports = new RoleService();
