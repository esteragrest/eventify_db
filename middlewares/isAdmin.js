const ROLES = require("../constans/roles");

const isAdmin = (req, res, next) => {
  if (req.user && req.user.roleId === ROLES.admin) {
    return next();
  }
  return res.status(403).json({ message: "Access denied" });
};

module.exports = isAdmin;
