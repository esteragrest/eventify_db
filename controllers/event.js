const EventService = require("../services/event");

class EventController {
  async getAllEvents(req, res) {
    const { title, limit, page } = req.query;

    const eventsWithLastPage = await EventService.getAllEvents({
      title,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
    });

    res.status(200).json(eventsWithLastPage);
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEventById(req, res) {
    try {
      const { eventId } = req.params;

      const event = await EventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEvent(req, res) {
    try {
      const organizerId = req.body.organizer_id;
      const userId = req.user.id;

      if (organizerId && organizerId !== userId) {
        return res.status(403).json({
          error: "You are not allowed to create event for this user.",
        });
      }

      const eventData = { ...req.body };
      const newEvent = await EventService.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EventController();
