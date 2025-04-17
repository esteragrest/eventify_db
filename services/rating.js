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
}

module.exports = new RatingService();
