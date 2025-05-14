const express = require("express");
const CommentController = require("../controllers/comment");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/event/:eventId", CommentController.getCommentsByEventId);

router.post("/", isAuthenticated, CommentController.createComment)

router.delete('/:commentId', isAuthenticated, CommentController.deleteComment)

module.exports = router;
