const RoleRepository = require("../repositories/role");

class RoleService {
  async getAllRoles() {
    return await RoleRepository.list();
  }
}

module.exports = new RoleService();
