const Role = require("../models/Role");

class RoleRepository {
  async list() {
    return await Role.findAll();
  }
}

module.exports = new RoleRepository();
