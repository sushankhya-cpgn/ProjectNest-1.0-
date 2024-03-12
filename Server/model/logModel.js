const mongoose = require("mongoose");

const log = new mongoose.Schema({
  entries: [
    {
      assignedTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      assignedTasks: [String],
      completedTasks: [String],
      remark: String,
      present: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

log.pre(/^find/, function (next) {
  this.populate({
    path: "entries.assignedTo",
    model: "User",
    select: "firstName lastName email",
  });
  next();
});

const Log = mongoose.model("Log", log);
module.exports = Log;
