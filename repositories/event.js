const { Op } = require("sequelize");
const Event = require("../models/Event");
const User = require("../models/User");

class EventRepository {
  async create(event) {
    return await Event.create(event);
  }

  async read(id) {
    return await Event.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }

  async update(id, eventData) {
    await Event.update(eventData, { where: { id } });
  }

  async delete(id) {
    await Event.destroy({ where: { id } });
  }

  async list({ title, limit, offset }) {
    const whereClause = {
      ...(title && { title: { [Op.iLike]: `%${title}%` } }),
      type: { [Op.ne]: "closed" },
    };

    return await Event.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["event_date", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }

  async findActiveEvents(userId) {
    const currentDate = new Date();
    return await Event.findAll({
      where: {
        event_date: {
          [Op.gte]: currentDate,
        },
        organizer_id: userId,
      },
      order: [["event_date", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }

  async findArchivedEvents(userId) {
    const currentDate = new Date();
    return await Event.findAll({
      where: {
        event_date: {
          [Op.lt]: currentDate,
        },
        organizer_id: userId,
      },
      order: [["event_date", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }

  async findWeeklyEvents() {
    const currentDate = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(currentDate.getDate() + 7);

    return await Event.findAll({
      where: {
        event_date: {
          [Op.gte]: currentDate,
          [Op.lte]: endOfWeek,
        },
      },
      limit: 8,
      order: [["event_date", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }
}

module.exports = new EventRepository();
