const mapUser = (user) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  birthDate: user.birth_date,
  email: user.email,
  phone: user.phone,
  photo: user.photo,
  roleId: user.role_id
});

module.exports = mapUser;
