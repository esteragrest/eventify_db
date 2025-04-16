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
    return await CommentRepository.findCommentsByEventId(eventId);
  }
}

module.exports = new CommentService();
