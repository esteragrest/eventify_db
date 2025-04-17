const mapComment = (comment) => ({
  id: comment.id,
  commentatorId: comment.user_id,
  eventId: comment.event_id,
  parentId: comment.parent_id,
  content: comment.content,
  createdAt: comment.created_at,
});

module.exports = mapComment;
