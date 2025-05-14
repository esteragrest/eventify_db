const UserService = require('../services/user');
const bcrypt = require('bcrypt');
const { generate } = require('../helpers/token');
const ROLES = require('../constans/roles');
const mapUser = require('../helpers/mapUser');
const mapEvent = require('../helpers/mapEvent');
const checkOwnership = require('../helpers/checkOwnership');

class UserController {
	async createUser(req, res) {
		try {
			const { email, password, role_id, ...userData } = req.body;

			const existingUser = await UserService.getUserByEmail(email);
			if (existingUser) {
				return res
					.status(400)
					.json({ error: 'The user with this email already exists' });
			}

			if (
				role_id &&
				role_id === ROLES.admin &&
				req.user.role_id !== ROLES.admin
			) {
				return res
					.status(403)
					.json({ message: 'Forbidden: Only admins can create other admins.' });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUserData = {
				...userData,
				email,
				password: hashedPassword,
				role_id: role_id || ROLES.user,
			};

			const newUser = await UserService.createUser(newUserData);

			const token = generate({ id: newUser.id, roleId: newUser.role_id });

			res.cookie('token', token, { httpOnly: true });

			res.status(201).json({ user: mapUser(newUser) });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async loginUser(req, res) {
		try {
			const { email, password } = req.body;
			const user = await UserService.getUserByEmail(email);

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Invalid credentials' });
			}

			const token = generate({ id: user.id, roleId: user.role_id });

			res.cookie('token', token, {
				httpOnly: true,
			});

			res.status(200).json({ user: mapUser(user) });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async logoutUser(req, res) {
		res.clearCookie('token', { httpOnly: true });
		res.status(200).json({ message: 'Logout successful' });
	}

	async getAllUsers(req, res) {
		try {
			const users = await UserService.getAllUsers();
			res.status(200).json(users.map(mapUser));
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getCurrentUser(req, res) {
		try {
			const { id } = req.user;

			const {
				user,
				countUserEvents,
				countOfEventsAttended,
				activeEvents,
				archivedEvents,
			} = await UserService.getUserProfile(id);

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.status(200).json({
				user: mapUser(user),
				countUserEvents,
				countOfEventsAttended,
				activeEvents: activeEvents.map(mapEvent),
				archivedEvents: archivedEvents.map(mapEvent),
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserProfileById(req, res) {
		try {
			const userId = Number(req.params.userId);

			const {
				user,
				countUserEvents,
				countOfEventsAttended,
				activeEvents,
				archivedEvents,
			} = await UserService.getUserProfile(userId);

			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			res.status(200).json({
				user: mapUser(user),
				countUserEvents,
				countOfEventsAttended,
				activeEvents: activeEvents.map(mapEvent),
				archivedEvents: archivedEvents.map(mapEvent),
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateUser(req, res) {
		try {
			const idUpdatedUser = Number(req.params.userId);
			const userId = req.user.id;
			const roleId = req.user.roleId;
			const updateData = req.body;

			const user = await UserService.getUserById(idUpdatedUser);
			if (!user) {
				return res.status(404).json({ error: 'User not found' });
			}

			const accessError = checkOwnership(idUpdatedUser, userId, roleId);
			if (accessError) {
				return res
					.status(accessError.status)
					.json({ error: accessError.message });
			}

			if (req.file) {
				updateData.photo = `${req.protocol}://${req.get('host')}/uploads/${
					req.file.filename
				}`;
			}

			if (updateData.password) {
				const hashedPassword = await bcrypt.hash(updateData.password, 10);
				updateData.password = hashedPassword;
			}

			const updatedUser = await UserService.updateUser(
				idUpdatedUser,
				updateData
			);

			res.status(200).json({
				user: mapUser(updatedUser),
			});
		} catch (error) {
			res.status(500).json({ error: 'Failed to update user' });
		}
	}

	async updateUserRole(req, res) {
		try {
			const { id } = req.params;
			const role_id = Number(req.body.role_id);

			if (!role_id) {
				return res.status(400).json({ error: 'Role ID is required.' });
			}

			const user = await UserService.getUserById(id);
			if (!user) {
				return res.status(404).json({ error: 'User not found.' });
			}

			await UserService.updateUserRole(id, role_id);

			res.status(200).json({ message: 'User role updated successfully' });
		} catch (error) {
			res.status(500).json({ error: 'Failed to update role.' });
		}
	}

	async deleteUser(req, res) {
		try {
			const targetUserId = Number(req.params.id);
			const currentUserId = req.user.id;
			const roleId = req.user.roleId;

			const ownershipError = checkOwnership(
				targetUserId,
				currentUserId,
				roleId
			);
			if (ownershipError) {
				return res
					.status(ownershipError.status)
					.json({ error: ownershipError.message });
			}

			const user = await UserService.getUserById(targetUserId);
			if (!user) {
				return res.status(404).json({ error: 'User not found.' });
			}

			await UserService.deleteUser(targetUserId);
			res.status(200).json({ message: 'User deleted successfully' });
		} catch (error) {
			res.status(500).json({ error: 'Failed to delete user.' });
		}
	}
}

module.exports = new UserController();
