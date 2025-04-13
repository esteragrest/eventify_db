const EventRepository = require("../repositories/event");

class EventService {
  async createEvent(eventData) {
    return await EventRepository.create(eventData);
  }

  async getEventById(id) {
    return await EventRepository.read(id);
  }

  async updateEvent(id, eventData) {
    await EventRepository.update(id, eventData);
  }

  async deleteEvent(id) {
    await EventRepository.delete(id);
  }

  async getAllEvents() {
    return await EventRepository.list();
  }

  async getEventsByTitle(title) {
    const events = await EventRepository.findByTitle(title);

    if (events.length === 0) {
      throw new Error("No such events were found.");
    }

    return events;
  }

  async getActiveEventsByUserId(userId) {
    const events = await EventRepository.findActiveEvents(userId);

    if (events.length === 0) {
      throw new Error("No such events were found.");
    }

    return events;
  }

  async getArchivedEventsByUserId(userId) {
    const events = await EventRepository.findArchivedEvents(userId);

    if (events.length === 0) {
      throw new Error("No such events were found.");
    }

    return events;
  }

  async getWeeklyEvents() {
    const events = await EventRepository.findWeeklyEvents();

    if (events.length === 0) {
      throw new Error("No such events were found.");
    }

    return events;
  }
}

module.exports = new EventService();
