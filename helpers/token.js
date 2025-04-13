const jwt = require("jsonwebtoken");

const JWT_SECRET = "Q30ThGiQThy2o4xS+x/v8J3G+V9v4eVbT2dRH4pExk0=";

module.exports = {
  generate(data) {
    return jwt.sign(data, JWT_SECRET, { expiresIn: "30d" });
  },

  verify(token) {
    return jwt.verify(token, JWT_SECRET);
  },
};
