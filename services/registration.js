const RegistrationRepository = require('../repositories/registration')

class RegistrationService {
	async createRegistration(registrationData) {
		return await RegistrationRepository.create(registrationData)
	}

	async getRegistrationById(id) {
		return await RegistrationRepository.read(id)
	}

	async getRegistrationByEventId(eventId) {
		const registrations =
			await RegistrationRepository.findRegistrationsByEventId(eventId)
		return (
			registrations.map(registration => ({
				...registration.get(),
				photo: registration.User.photo,
			})) || []
		)
	}

	async getRegistrationsByUserId(userId) {
		return await RegistrationRepository.findAllUserRegistrations(userId)
	}

	async getRegistrationByEventIdAndUserId(eventId, userId) {
		return await RegistrationRepository.findOneRegistrationByEventIdAndUserId(
			eventId,
			userId
		)
	}
}

module.exports = new RegistrationService()
