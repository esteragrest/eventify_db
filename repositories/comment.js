const Comment = require("../models/Comment");

class CommentRepository {
  async create(comment) {
    return await Comment.create(comment);
  }

  async update(id, commentData) {
    await Comment.update(commentData, { where: { id } });
  }

  async delete(id) {
    await Comment.destroy({ where: { id } });
  }

  async findCommentByEventId(eventId) {
    return await Comment.findAll({ where: { event_id: eventId } });
  }
}

module.exports = new CommentRepository();
