const mongoose = require("mongoose");

const ganttChartSchema = new mongoose.Schema(
  {
    totalWeeks: {
      type: Number,
    },
    weeks: [
      {
        week: {
          type: mongoose.Schema.ObjectId,
          ref: "Week",
        },
        weekNo: {
          type: Number,
          unique: [true, "week no. must be unique"],
        },
      },
    ],
    tasks: [String],
    completed: {
      type: Boolean,
      default: false,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const GanttChart = mongoose.model("GanttChart", ganttChartSchema);
module.exports = GanttChart;
