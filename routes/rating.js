const express = require("express")
const RatingController = require("../controllers/rating")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")

// Post /ratings

router.get('/event/:eventId/list', RatingController.getRatingsByEventId)

router.get('/event/:eventId/average', RatingController.getAverageRatingByEventId)

router.post('/', isAuthenticated, RatingController.createRating)

module.exports = router