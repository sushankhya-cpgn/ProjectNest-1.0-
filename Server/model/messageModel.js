const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      requried: [true, "a message must have some content"],
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      requried: [true, "a message must be sent to a room"],
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      requried: [true, "a message must have a sender"],
    },
    unsent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
