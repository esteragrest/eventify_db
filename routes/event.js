const express = require("express");
const EventController = require("../controllers/event");
const router = express.Router();

// Post /events – создание мероприятия(авторизованный пользователь)
// Put /events/:id – изменение мероприятия (сам пользователь, админ)
// Delete /events/:id – удаление мероприятия (сам пользователь, админ)
// Get /events/user/:userId/active-events – получение текущих мероприятий пользователя
// Get /events/user/:userId/archived-events – получение прошедших мероприятий пользователя
// Get /events/weekly-events – получение мероприятий текущей недели(любой пользователь)

router.get("/", EventController.getAllEvents);

router.get("/:eventId", EventController.getEventById)

module.exports = router;
