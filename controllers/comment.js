const ROLES = require("../constans/roles");
const CommentService = require("../services/comment");
const EventService = require("../services/event");

class CommentController {
  async getCommentsByEventId(req, res) {
    try {
      const eventId = Number(req.params.eventId);

      const event = await EventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      const comments = await CommentService.getCommentsByEventId(eventId);

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createComment(req, res) {
    try {
      const commentatorId = req.body.user_id;
      const userId = req.user.id;

      if (commentatorId && commentatorId !== userId) {
        return res.status(403).json({
          error: "Forbiden: You can't leave a comment from another user.",
        });
      }

      const parentCommentId = req.body.parent_id;
      const parentComment = parentCommentId
        ? await CommentService.getCommentById(parentCommentId)
        : null;

      if (parentCommentId && !parentComment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const commentData = { ...req.body };
      const newComment = await CommentService.createComment(commentData);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const commentId = Number(req.params.commentId);
      const userId = req.user.id;
      const roleId = req.user.roleId;

      const comment = await CommentService.getCommentById(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const commentatorId = comment.user_id;

      if (commentatorId !== userId && roleId !== ROLES.admin) {
        return res.status(403).json({
          error: "Forbidden: You can't delete someone else's comment.",
        });
      }

      await CommentService.deleteComment(commentId);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CommentController();
