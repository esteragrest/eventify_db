const mapComment = (comment) => ({
  id: comment.id,
  commentatorFirstName: comment.first_name,
  commentatorLastName: comment.last_name,
  eventId: comment.event_id,
  parentId: comment.parent_id,
  content: comment.content,
  createdAt: comment.created_at,
});

module.exports = mapComment;
