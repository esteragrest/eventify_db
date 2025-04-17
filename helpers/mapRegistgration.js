const mapRegistration = (registration) => ({
  id: registration.id,
  firstName: registration.first_name,
  lastName: registration.last_name,
  registeredId: registration.user_id,
  eventId: registration.event_id,
  email: registration.email,
  phone: registration.phone,
  participantsCount: registration.participants_count,
});

module.exports = mapRegistration;
