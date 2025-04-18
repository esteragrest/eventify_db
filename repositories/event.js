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

  async list() {
    return await Event.findAll();
  }

  async findByTitle(title) {
    return await Event.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
  }

  async findActiveEvents(userId) {
    const currentDate = new Date();
    return await Event.findAll({
      where: {
        date: {
          [Op.gte]: currentDate,
        },
        user_id: userId,
      },
    });
  }

  async findArchivedEvents(userId) {
    const currentDate = new Date();
    return await Event.findAll({
      where: {
        date: {
          [Op.lt]: currentDate,
        },
        user_id: userId,
      },
    });
  }

  async findWeeklyEvents() {
    const currentDate = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(currentDate.getDate() + 7);

    return await Event.findAll({
      where: {
        date: {
          [Op.gte]: currentDate,
          [Op.lte]: endOfWeek,
        },
      },
      limit: 8,
      order: [["date", "ASC"]],
    });
  }
}

module.exports = new EventRepository();
