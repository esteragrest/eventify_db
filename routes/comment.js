const express = require("express");
const CommentController = require("../controllers/comment");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

// Post /comments – создание комментария(авторизованный пользователь)
// Delete /comments/:id – удаление комментария (оставивший комментарий, админ)
// Put - /comments/:id (оставивший комментарий, админ)

// Get /comments/event/:eventId – получение комментариев к одному мероприятию
router.get("/event/:eventId", CommentController.getCommentsByEventId);

module.exports = router;
