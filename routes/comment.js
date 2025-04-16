const express = require("express");
const CommentController = require("../controllers/comment");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");


// Delete /comments/:id – удаление комментария (оставивший комментарий, админ)
// Put - /comments/:id (оставивший комментарий, админ)

router.get("/event/:eventId", CommentController.getCommentsByEventId);

router.post("/", isAuthenticated, CommentController.createComment)

module.exports = router;
