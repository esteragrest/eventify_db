const mapEvent = require("../helpers/mapEvent");
const EventService = require("../services/event");
const UserService = require("../services/user");
const checkOwnership = require("../helpers/checkOwnership");
const generateEventLink = require("../helpers/generateEventLink");

class EventController {
  async getAllEvents(req, res) {
    const { title, limit, page } = req.query;

    const eventsWithLastPage = await EventService.getAllEvents({
      title,
      limit: Number(limit) || 10,
      page: Number(page) || 1,
    });

    res.status(200).json({
      events: eventsWithLastPage.events.map(mapEvent),
      lastPage: eventsWithLastPage.lastPage,
    });
    try {
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEventById(req, res) {
    try {
      const { eventId } = req.params;
      const { accessLink } = req.query;

      const event = await EventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      if (event.type === "closed" && event.access_link !== accessLink) {
        return res
          .status(403)
          .json({ error: "Access denied: Invalid or missing link." });
      }

      res.status(200).json(mapEvent(event));
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

      if (eventData.type === "closed") {
        eventData.access_link = generateEventLink();
      }

      const newEvent = await EventService.createEvent(eventData);
      res.status(201).json({
        event: mapEvent(newEvent),
        link: eventData.access_link || null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEvent(req, res) {
    try {
      const eventId = Number(req.params.eventId);
      const userId = req.user.id;
      const roleId = req.user.roleId;

      const event = await EventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      const organizerId = event.organizer_id;
      const ownershipError = checkOwnership(organizerId, userId, roleId);
      if (ownershipError) {
        return res
          .status(ownershipError.status)
          .json({ error: ownershipError.message });
      }

      await EventService.updateEvent(eventId, { ...req.body });

      res.status(200).json({
        message: "Event updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteEvent(req, res) {
    try {
      const eventId = req.params.eventId;
      const userId = req.user.id;
      const roleId = req.user.roleId;

      const event = await EventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      const organizerId = event.organizer_id;
      const ownershipError = checkOwnership(organizerId, userId, roleId);
      if (ownershipError) {
        return res
          .status(ownershipError.status)
          .json({ error: ownershipError.message });
      }

      await EventService.deleteEvent(eventId);
      res.status(200).json({
        message: "Event deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getActiveEventsByUserId(req, res) {
    try {
      const userId = Number(req.params.userId);

      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const activeEvents = await EventService.getActiveEventsByUserId(userId);

      res.status(200).json(activeEvents.map(mapEvent));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArchivedEventsByUserId(req, res) {
    try {
      const userId = Number(req.params.userId);

      const user = await UserService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const activeEvents = await EventService.getArchivedEventsByUserId(userId);

      res.status(200).json(activeEvents.map(mapEvent));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWeeklyEvents(req, res) {
    try {
      const weeklyEvents = await EventService.getWeeklyEvents();
      res.status(200).json(weeklyEvents.map(mapEvent));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EventController();
