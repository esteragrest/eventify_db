const CommentRepository = require("../repositories/comment");

class CommentService {
  async createComment(commentData) {
    const newComment = await CommentRepository.create(commentData);
    return {
      id: newComment.id,
      content: newComment.content,
      created_at: newComment.created_at,
      event_id: newComment.event_id,
      user_id: newComment.user_id,
      parent_id: newComment.parent_id,
      first_name: newComment.User.first_name,
      last_name: newComment.User.last_name,
      photo: newComment.User.photo,
    };
  }  

  async getCommentById(id) {
    return await CommentRepository.read(id);
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
      user_id: comment.user_id,
      parent_id: comment.parent_id,
      first_name: comment.User.first_name,
      last_name: comment.User.last_name,
      photo: comment.User.photo
    }));
  }
}

module.exports = new CommentService();
