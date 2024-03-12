const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a room must have a name"],
    },
    roomtype: {
      type: String,
      required: [true, "room must have a room type"],
      enum: {
        values: ["supervised-team-room", "members-team-room"],
        message: "room type must be supervised-team-room or members-team-room",
      },
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

roomSchema.methods.addToRoom = function (member) {
  this.members.push(member);
};

roomSchema.methods.removeFromRoom = function (member) {
  const index = this.members.indexOf(member);
  if (index > -1) {
    this.members.splice(index, 1);
  }
};

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
