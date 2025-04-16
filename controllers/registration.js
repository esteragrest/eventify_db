const ROLES = require("../constans/roles");
const RegistrationService = require("../services/registration");
const EventService = require("../services/event");

class RegistrationController {
  async getRegistrationByEventId(req, res) {
    try {
      const { eventId } = req.params;
      const userId = req.user.id;
      const roleId = req.user.roleId;

      const event = await EventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      const organizerId = event.organizer_id;

      if (organizerId !== userId && roleId !== ROLES.admin) {
        return res.status(403).json({
          error:
            "Forbidden: You do not have permission to view registrations for this event.",
        });
      }

      const registrations = await RegistrationService.getRegistrationByEventId(
        eventId
      );

      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRegistrationByUserId(req, res) {
    try {
      const { userId } = req.params;

      if (req.user.id !== userId && req.user.roleId !== ROLES.admin) {
        return res.status(403).json({
          error: "Forbidden: You do not have permission to access this data.",
        });
      }

      const userRegistrations =
        await RegistrationService.getRegistrationsByUserId(userId);

      // Если у пользователя нет регистраций
      // if (!userRegistrations || userRegistrations.length === 0) {
      //   return res.status(404).json({ error: "No registrations found for this user." });
      // }

      // Получаем информацию о мероприятиях, на которые зарегистрирован пользователь
      const eventIds = userRegistrations.map(
        (registration) => registration.event_id
      );
      const events = await EventService.getEventsByIds(eventIds);

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RegistrationController();
