const CommentRepository = require("../models/Comment");

class CommentService {
  async createComment(commentData) {
    return await CommentRepository.create(commentData);
  }

  async updateComment(id, commentData) {
    await CommentRepository.update(id, commentData);
  }

  async deleteComment(id) {
    await CommentRepository.delete(id);
  }

  async getCommentByEventId(eventId) {
    return await CommentRepository.findCommentByEventId(eventId);
  }
}

module.exports = new CommentService();
