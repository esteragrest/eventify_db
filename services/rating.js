const RatingRepository = require("../repositories/rating");

class RatingService {
  async createRating(ratingData) {
    return await RatingRepository.create(ratingData);
  }

  async getRatingsByEventId(eventId) {
    return await RatingRepository.findRatingsByEnventId(eventId);
  }

  async getAverageRatingByEventId(eventId) {
    return await RatingRepository.getAverageRating(eventId);
  }

  async getRatingByEventIdAndUserId(eventId, userId) {
    return await RatingRepository.findRatingByEventIdAndUserId(eventId, userId)
  }
}

module.exports = new RatingService();
