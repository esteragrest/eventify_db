const Comment = require("../models/Comment");
const User = require("../models/User")

class CommentRepository {
  async create(comment) {
    const newComment = await Comment.create(comment);
    
    return await Comment.findByPk(newComment.id, {
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name", "photo"],
        },
      ],
    });
  }  
  

  async read(id) {
    return await Comment.findByPk(id);
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
          attributes: ["first_name", "last_name", "photo"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }
}

module.exports = new CommentRepository();
