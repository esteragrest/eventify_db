const EventRepository = require("../repositories/event");
const RegistrationRepository = require("../repositories/registration");
const CommentService = require("./comment")

class EventService {
  async createEvent(eventData) {
    return await EventRepository.create(eventData);
  }

  async getEventById(id) {
    const comments = await CommentService.getCommentsByEventId(id)
    const event = await EventRepository.read(id);

    return {
      event: {...event.get(), first_name: event.User.first_name, last_name: event.User.last_name},
      comments
    }
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

    
  const events = eventsWithCount.rows.map(event => ({
    ...event.get(),
    first_name: event.User.first_name,
    last_name: event.User.last_name, 
  }));

  return {
    events,
    lastPage: Math.ceil(eventsWithCount.count / limit),
  };
  }

  async getActiveEventsByUserId(userId) {
    const events = await EventRepository.findActiveEvents(userId);

    return events.map(event => ({
      ...event.get(),
      first_name: event.User.first_name,
      last_name: event.User.last_name, 
    })) || [];
  }

  async getArchivedEventsByUserId(userId) {
    const events = await EventRepository.findArchivedEvents(userId);

    return events.map(event => ({
      ...event.get(),
      first_name: event.User.first_name,
      last_name: event.User.last_name, 
    })) || [];
  }

  async getWeeklyEvents() {
    const events = await EventRepository.findWeeklyEvents();

    return events.map(event => ({
      ...event.get(),
      first_name: event.User.first_name,
      last_name: event.User.last_name, 
    })) || [];
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

  async getEventsByIds(eventIds) {
    const events = await EventRepository.findEventsByIds(eventIds);

    return events.map(event => ({
      ...event.get(),
      first_name: event.User.first_name,
      last_name: event.User.last_name, 
    })) || [];
  }
}

module.exports = new EventService();
