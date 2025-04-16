const express = require("express");
const RegistrationController = require("../controllers/registration");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

// Post /registration – регистрация пользователя на мерориятие(авторизованный пользователь)
// Get /registration/:id – получение одной регистрации(может и не надо)
// Delete /registration/:id – удаление регистрации (владелец мероприятия, зарегистрированный(не знаю))

router.get(
  "/event/:eventId",
  isAuthenticated,
  RegistrationController.getRegistrationByEventId
);

router.get("/user/:userId", isAuthenticated, RegistrationController.getRegistrationByUserId)

module.exports = router;
