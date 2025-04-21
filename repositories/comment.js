const Comment = require("../models/Comment");
const User = require("../models/User")

class CommentRepository {
  async create(comment) {
    return await Comment.create(comment);
  }

  async read(id) {
    return await Comment.findByPk(id);
  }

  async update(id, commentData) {
    await Comment.update(commentData, { where: { id } });
  }

  async delete(id) {
    await Comment.destroy({ where: { id } });
  }

  async findCommentsByEventId(eventId) {
    return await Comment.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });
  }
}

module.exports = new CommentRepository();
