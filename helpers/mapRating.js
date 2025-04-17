const mapRating = (rating) => ({
  id: rating.id,
  reviewerId: rating.user_id,
  eventId: rating.event_id,
  rating: rating.rating,
  createdAt: rating.created_at,
});

module.exports = mapRating;
