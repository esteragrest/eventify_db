const ROLES = require("../constans/roles");
const RegistrationService = require("../services/registration");
const EventService = require("../services/event");
const mapRegistration = require("../helpers/mapRegistgration");
const mapEvent = require("../helpers/mapEvent");
const checkOwnership = require("../helpers/checkOwnership");

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

      res.status(200).json(registrations.map(mapRegistration));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRegistrationByUserId(req, res) {
    try {
      const userId = Number(req.params.userId);

      if (req.user.id !== userId && req.user.roleId !== ROLES.admin) {
        return res.status(403).json({
          error: "Forbidden: You do not have permission to access this data.",
        });
      }

      const userRegistrations =
        await RegistrationService.getRegistrationsByUserId(userId);

      const eventIds = userRegistrations.map(
        (registration) => registration.event_id
      );
      const events = await EventService.getEventsByIds(eventIds);

      res.status(200).json(events.map(mapEvent));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createRegistration(req, res) {
    try {
      const registeringUserId = req.body.user_id;
      const userId = req.user.id;

      if (registeringUserId && registeringUserId !== userId) {
        return res.status(403).json({
          error: "Forbiden: You cannot register from another user.",
        });
      }

      const registrationData = { ...req.body };
      const newRegistration = await RegistrationService.createRegistration(
        registrationData
      );
      res.status(200).json(mapRegistration(newRegistration));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRegistration(req, res) {
    try {
      const registrationIdParams = Number(req.params.registrationId);
      const userId = req.user.id;
      const roleId = req.user.roleId;

      const registration = await RegistrationService.getRegistrationById(
        registrationIdParams
      );

      if (!registration) {
        return res.status(404).json({ error: "Registration not found" });
      }

      const registeredUserId = registration.user_id;
      const ownershipError = checkOwnership(registeredUserId, userId, roleId);
      if (ownershipError) {
        return res
          .status(ownershipError.status)
          .json({ error: ownershipError.message });
      }

      await RegistrationService.deleteRegistration(registrationIdParams);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RegistrationController();
