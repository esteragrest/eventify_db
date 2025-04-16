const express = require("express");
const RegistrationController = require("../controllers/registration");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

// Delete /registration/:id – удаление регистрации (владелец мероприятия, зарегистрированный(не знаю))

router.get(
  "/event/:eventId",
  isAuthenticated,
  RegistrationController.getRegistrationByEventId
);

router.get("/user/:userId", isAuthenticated, RegistrationController.getRegistrationByUserId)

router.post('/', isAuthenticated, RegistrationController.createRegistration)

module.exports = router;
