const ROLES = require("../constans/roles")

function checkOwnership(entityUserId, currentUserId, currentUserRole) {
  if (entityUserId !== currentUserId && currentUserRole !== ROLES.admin) {
    return {
      status: 403,
      message: "Forbidden: Access is denied.",
    };
  }
  return null;
}

module.exports = checkOwnership;
