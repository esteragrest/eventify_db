const RegistrationRepository = require("../repositories/registration");

class RegistrationService {
  async createRegistration(registrationData) {
    return await RegistrationRepository.create(registrationData);
  }

  async getRegistrationById(id) {
    return await RegistrationRepository.read(id);
  }

  async deleteRegistration(id) {
    await RegistrationRepository.delete(id);
  }

  async getRegistrationByEventId(eventId) {
    return await RegistrationRepository.findRegistrationsByEventId(eventId);
  }

  async getRegistrationsByUserId(userId) {
    return await RegistrationRepository.findAllUserRegistrations(userId);
  }
}

module.exports = new RegistrationService();
