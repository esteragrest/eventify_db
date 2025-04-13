const User = require("../models/User");

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async read(id) {
    return await User.findByPk(id);
  }

  async update(id, userData) {
    await User.update(userData, { where: { id } });
  }

  async delete(id) {
    await User.destroy({ where: { id } });
  }

  async list() {
    return await User.findAll();
  }

  async findByEmail(email) {
    return await User.findOne({
      where: { email },
    });
  }

  async changeRole(id, newRole) {
    await User.update({ role: newRole }, { where: { id } });
  }
}

module.exports = new UserRepository();
