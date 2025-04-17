const RatingService = require("../services/rating");
const EventService = require("../services/event");

class RatingController {
  async getRatingsByEventId(req, res) {
    const eventId = Number(req.params.eventId);

    const event = await EventService.getEventById(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const ratings = await RatingService.getRatingsByEventId(eventId);

    res.status(200).json(ratings);
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RatingController();
