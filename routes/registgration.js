const express = require("express");
const RegistrationController = require("../controllers/registration");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get(
  "/event/:eventId",
  isAuthenticated,
  RegistrationController.getRegistrationByEventId
);

router.get(
  "/user/:userId",
  isAuthenticated,
  RegistrationController.getRegistrationByUserId
);

router.post("/", isAuthenticated, RegistrationController.createRegistration);

router.delete(
  "/:registrationId",
  isAuthenticated,
  RegistrationController.deleteRegistration
);
module.exports = router;
