const Rating = require("../models/Rating");

class RatingRepository {
  async create(rating) {
    return await Rating.create(rating);
  }

  async findRatingsByEnventId(eventId) {
    return await Rating.findAll({ where: { event_id: eventId } });
  }

  async getAverageRating(eventId) {
    const ratings = await Rating.findAll({
      where: { event_id: eventId },
      attributes: ["rating"],
    });

    const sumOfTheRatings = ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    const averageRating = sumOfTheRatings / ratings.length;

    return parseFloat(averageRating.toFixed(1));
  }

  async findRatingByEventIdAndUserId(eventId, userId) {
    return await Rating.findOne({
      where: {
        event_id: eventId,
        user_id: userId,
      }
    });
  }
}

module.exports = new RatingRepository();
