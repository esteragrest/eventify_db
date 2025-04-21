const express = require("express");
const EventController = require("../controllers/event");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");

router.get("/", EventController.getAllEvents);

router.get("/event/:eventId", EventController.getEventById);

router.post("/", isAuthenticated, upload.single("photo"), EventController.createEvent);

router.put("/:eventId", isAuthenticated, upload.single("photo"), EventController.updateEvent);

router.delete("/:eventId", isAuthenticated, EventController.deleteEvent);

router.get(
  "/user/:userId/active-events",
  isAuthenticated,
  EventController.getActiveEventsByUserId
);

router.get(
  "/user/:userId/archived-events",
  isAuthenticated,
  EventController.getArchivedEventsByUserId
);

router.get("/weekly-events", EventController.getWeeklyEvents);
module.exports = router;
