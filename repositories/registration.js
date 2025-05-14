const Registration = require('../models/Registration')
const User = require('../models/User')

class RegistrationRepository {
	async create(registration) {
		return await Registration.create(registration)
	}

	async read(id) {
		return await Registration.findByPk(id)
	}

	async findRegistrationsByEventId(eventId) {
		return await Registration.findAll({
			where: { event_id: eventId },
			include: [
				{
					model: User,
					attributes: ['photo'],
				},
			],
		})
	}

	async findAllUserRegistrations(userId) {
		return await Registration.findAll({ where: { user_id: userId } })
	}

	async findOneRegistrationByEventIdAndUserId(eventId, userId) {
		return await Registration.findOne({
			where: {
				event_id: eventId,
				user_id: userId,
			},
		})
	}
}

module.exports = new RegistrationRepository()
