const UserRepository = require("../repositories/user");
const EventRepository = require("../repositories/event");
const EventService = require("../services/event");

class UserService {
  async createUser(userData) {
    return await UserRepository.create(userData);
  }

  async getUserById(id) {
    return await UserRepository.read(id);
  }

  async updateUser(id, userData) {
    return await UserRepository.update(id, userData);
  }

  async deleteUser(id) {
    await UserRepository.delete(id);
  }

  async getAllUsers() {
    return await UserRepository.list();
  }

  async getUserByEmail(email) {
    const user = await UserRepository.findByEmail(email);

    return user;
  }

  async updateUserRole(id, newRole) {
    await UserRepository.changeRole(id, newRole);
  }

  async getUserProfile(id) {
    const user = await UserRepository.read(id);

    const countUserEvents = await EventRepository.countEventsByUserId(id);

    const countOfEventsAttended = await EventService.getOfEventsAttended(id);

    const activeEvents = await EventService.getActiveEventsByUserId(id);

    const archivedEvents = await EventService.getArchivedEventsByUserId(id);

    return {
      user,
      countUserEvents,
      countOfEventsAttended,
      activeEvents,
      archivedEvents,
    };
  }
}

module.exports = new UserService();
