const crypto = require("crypto");

const generateEventLink = () => {
  const uniqueLink = crypto.randomBytes(16).toString("hex");

  return uniqueLink;
};

module.exports = generateEventLink;
