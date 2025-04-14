const EventRepository = require("../repositories/event");
const RegistrationRepository = require("../repositories/registration");

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

  async getAllEvents({ title, limit, page }) {
    limit = limit || 10;
    page = page || 1;

    const offset = (page - 1) * limit;

    const eventsWithCount = await EventRepository.list({
      title,
      limit,
      offset,
    });

    return {
      events: eventsWithCount.rows,
      lastPage: Math.ceil(eventsWithCount.count / limit),
    };
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

  async getOfEventsAttended(userId) {
    const registrations = await RegistrationRepository.findAllUserRegistrations(
      userId
    );

    const eventIds = registrations.map((registration) => registration.event_id);

    const countOfEventsAttended = await EventRepository.countOfEventsAttended(
      eventIds
    );

    return countOfEventsAttended;
  }
}

module.exports = new EventService();
