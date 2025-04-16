const CommentService = require("../services/comment");
const EventService = require("../services/event");

class CommentController {
  async getCommentsByEventId(req, res) {
    try {
      const eventId = Number(req.params.eventId);

      const event = await EventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      const comments = await CommentService.getCommentsByEventId(eventId);

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CommentController();
