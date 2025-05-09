const Registration = require("../models/Registration");

class RegistrationRepository {
  async create(registration) {
    return await Registration.create(registration);
  }

  async read(id) {
    return await Registration.findByPk(id);
  }

  async delete(id) {
    await Registration.destroy({ where: { id } });
  }

  async findRegistrationsByEventId(eventId) {
    return await Registration.findAll({ where: { event_id: eventId } });
  }

  async findAllUserRegistrations(userId) {
    return await Registration.findAll({ where: { user_id: userId } });
  }
}

module.exports = new RegistrationRepository();
