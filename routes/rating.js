const express = require("express")
const RatingController = require("../controllers/rating")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")

// Post /ratings
// Get /ratings/event/:eventId/average – получение общей оценки мероприятия

router.get('/event/:eventId/list', RatingController.getRatingsByEventId)

module.exports = router