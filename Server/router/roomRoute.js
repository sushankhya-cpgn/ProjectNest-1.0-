const express = require("express");
const authController = require("../controller/authController");
const roomController = require("../controller/roomController");
const router = express.Router();

router
  .route("/:id/send-message")
  .post(
    authController.protect,
    authController.restrictTo("supervisor", "student"),
    roomController.sendRoomMessage
  );

router
  .route("/:id/get-messages")
  .get(
    authController.protect,
    authController.restrictTo("supervisor", "student"),
    roomController.getRoomMessages
  );

module.exports = router;
