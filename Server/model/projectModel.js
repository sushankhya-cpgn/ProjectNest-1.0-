const mongoose = require("mongoose");
const Room = require("./roomModel");
const AppError = require("../utils/appError");
const GanttChart = require("./ganttChartModel");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "project must have a name"],
    },
    semester: {
      type: Number,
      validate: {
        validator: function (val) {
          if (!Number.isInteger(val)) return false;
          return !(val < 1 || val > 8);
        },
      },
      message: "{VALUE} is not a valid semster number",
    },
    report: {
      type: String,
    },
    proposal: {
      type: String,
    },
    description: {
      type: String,
    },
    technologyUsed: [
      {
        type: String,
      },
    ],
    supervisor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
      },
    ],
    submissionDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    ganttChart: {
      type: mongoose.Schema.ObjectId,
      ref: "GanttChart",
    },
    logSheets: [
      {
        date: {
          type: Date,
          required: [true, "date is required"],
        },
        log: {
          type: mongoose.Schema.ObjectId,
          ref: "Log",
        },
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//creating rooms for the project
projectSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  //inserting rooms
  const members = this.members.map((mem) => mem);
  const supervisedMembers = members.map((mem) => mem);
  if (this.supervisor) supervisedMembers.push(this.supervisor);
  const supervisedRoomData = {
    name: `${this.name.split(" ").join("-")}-supervised-team-room`,
    roomtype: "supervised-team-room",
    members: supervisedMembers,
  };
  const supervisedRoom = await Room.create(supervisedRoomData);
  const teamRoomData = {
    name: `${this.name.split(" ").join("-")}-members-team-room`,
    roomtype: "members-team-room",
    members,
  };
  const teamRoom = await Room.create(teamRoomData);

  if (!supervisedRoom || !teamRoom) {
    return next(new AppError(500, "somethinge went wrong please try again"));
  }
  this.rooms.push(supervisedRoom.id);
  this.rooms.push(teamRoom.id);
  next();
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
