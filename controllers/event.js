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
}

module.exports = new EventController();
