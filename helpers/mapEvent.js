const mapEvent = (event) => ({
  id: event.id,
  title: event.title,
  organizerId: event.organizer_id,
  eventDate: event.event_date,
  eventTime: event.event_time,
  description: event.description,
  type: event.type,
  payment: event.payment,
  address: event.address,
  ageLimit: event.age_limit,
  maxParticipants: event.max_participants,
  photo: event.photo,
  accessLink: event.access_link,
});

module.exports = mapEvent;
