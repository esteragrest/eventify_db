const CommentRepository = require("../repositories/comment");

class CommentService {
  async createComment(commentData) {
    return await CommentRepository.create(commentData);
  }

  async getCommentById(id) {
    return await CommentRepository.read(id);
  }

  async updateComment(id, commentData) {
    await CommentRepository.update(id, commentData);
  }

  async deleteComment(id) {
    await CommentRepository.delete(id);
  }

  async getCommentsByEventId(eventId) {
    const comments = await CommentRepository.findCommentsByEventId(eventId);

    return comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      event_id: comment.event_id,
      parent_id: comment.parent_id,
      first_name: comment.User.first_name,
      last_name: comment.User.last_name,
    }));
  }
}

module.exports = new CommentService();
