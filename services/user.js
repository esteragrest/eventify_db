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
    await UserRepository.update(id, userData);
  }

  async deleteUser(id) {
    await UserRepository.delete(id);
  }

  async getAllUsers() {
    return await UserRepository.list();
  }

  async getUserByEmail(email) {
    const users = await UserRepository.findByEmail(email);
    if (users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  async updateUserRole(id, newRole) {
    await UserRepository.changeRole(id, newRole);
  }

  async getUserProfile(id) {
    const user = await UserRepository.read(id);

    const countUserEvents = await EventRepository.countEventsByUserId(id);

    const countOfEventsAttended = await EventService.getOfEventsAttended(id);

    return {
      user,
      countUserEvents,
      countOfEventsAttended,
    };
  }
}

module.exports = new UserService();
