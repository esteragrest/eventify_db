const RatingService = require('../services/rating')
const EventService = require('../services/event')
const mapRating = require('../helpers/mapRating')

class RatingController {
	async getRatingsByEventId(req, res) {
		try {
			const eventId = Number(req.params.eventId)

			const { event } = await EventService.getEventById(eventId)

			if (!event) {
				return res.status(404).json({ error: 'Event not found' })
			}

			const ratings = await RatingService.getRatingsByEventId(eventId)

			res.status(200).json(ratings.map(mapRating))
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getRatingByEventIdAndUserId(req, res) {
		try {
			const userId = req.user.id

			const eventId = Number(req.params.eventId)

			const rating = await RatingService.getRatingByEventIdAndUserId(
				eventId,
				userId
			)

			if (!rating) {
				return res.status(200).json({ isRated: false })
			}

			res.status(200).json({ isRated: true })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAverageRatingByEventId(req, res) {
		try {
			const eventId = Number(req.params.eventId)

			const { event } = await EventService.getEventById(eventId)

			if (!event) {
				return res.status(404).json({ error: 'Event not found' })
			}

			const averageRating = await RatingService.getAverageRatingByEventId(
				eventId
			)

			res.status(200).json({ averageRating })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async createRating(req, res) {
		try {
			const reviewerId = req.body.user_id
			const eventId = req.body.event_id
			const userId = req.user.id

			if (reviewerId && reviewerId !== userId) {
				res.status(403).json({
					error: "Forbidden: You can't leave a rating from another user.",
				})
			}

			const { event } = await EventService.getEventById(eventId)

			if (!event) {
				return res.status(404).json({ error: 'Event not found' })
			}

			const ratingData = { ...req.body }
			const newRating = await RatingService.createRating(ratingData)

			res.status(201).json(mapRating(newRating))
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = new RatingController()
