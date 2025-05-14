const { format } = require('date-fns')

const mapEvent = event => ({
	id: event.id,
	title: event.title,
	organizerId: event.organizer_id,
	organizerFirstName: event.first_name,
	organizerLastName: event.last_name,
	eventDate: format(new Date(event.event_date), 'dd.MM.yyyy'),
	eventTime: event.event_time,
	description: event.description,
	type: event.type,
	payment: event.payment,
	address: event.address,
	ageLimit: event.age_limit,
	maxParticipants: event.max_participants,
	photo: event.photo,
})

module.exports = mapEvent
