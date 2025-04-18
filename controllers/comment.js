const mapComment = require("../helpers/mapComment");
const CommentService = require("../services/comment");
const EventService = require("../services/event");
const checkOwnership = require("../helpers/checkOwnership");

class CommentController {
  async getCommentsByEventId(req, res) {
    try {
      const eventId = Number(req.params.eventId);

      const event = await EventService.getEventById(eventId);

      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      const comments = await CommentService.getCommentsByEventId(eventId);

      res.status(200).json(comments.map(mapComment));
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
      res.status(201).json(mapComment(newComment));
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
      const ownershipError = checkOwnership(commentatorId, userId, roleId);
      if (ownershipError) {
        return res
          .status(ownershipError.status)
          .json({ error: ownershipError.message });
      }

      await CommentService.deleteComment(commentId);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const commentId = Number(req.params.commentId);
      const userId = req.user.id;
      const roleId = req.user.roleId;

      const comment = await CommentService.getCommentById(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const commentatorId = comment.user_id;
      const ownershipError = checkOwnership(commentatorId, userId, roleId);
      if (ownershipError) {
        return res
          .status(ownershipError.status)
          .json({ error: ownershipError.message });
      }

      await CommentService.updateComment(commentId, { ...req.body });
      res.status(200).json({
        message: "Comment updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CommentController();
