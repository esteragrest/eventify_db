const { Op } = require("sequelize");
const Event = require("../models/Event");

class EventRepository {
  async create(event) {
    return await Event.create(event);
  }

  async read(id) {
    return await Event.findByPk(id);
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
    });
  }

  async countEventsByUserId(userId) {
    return await Event.count({
      where: {
        organizer_id: userId,
      },
    });
  }

  async countOfEventsAttended(eventIds) {
    const countOfEventsAttended = await Event.count({
      where: {
        id: { [Op.in]: eventIds },
        event_date: { [Op.lt]: new Date() },
      },
    });

    return countOfEventsAttended;
  }

  async findEventsByIds(eventIds) {
    return await Event.findAll({
      where: {
        id: { [Op.in]: eventIds },
      },
      order: [["event_date", "ASC"]],
    });
  }
}

module.exports = new EventRepository();
