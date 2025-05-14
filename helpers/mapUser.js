const { format } = require('date-fns')

const mapUser = user => ({
	id: user.id,
	firstName: user.first_name,
	lastName: user.last_name,
	birthDate: format(new Date(user.birth_date), 'dd.MM.yyyy'),
	email: user.email,
	phone: user.phone,
	photo: user.photo,
	roleId: user.role_id,
})

module.exports = mapUser
