const mongoose = require("mongoose");

const weekSchema = new mongoose.Schema({
  from: Date,
  to: Date,
  tasksToDo: [String],
});

const Week = mongoose.model("Week", weekSchema);
module.exports = Week;
