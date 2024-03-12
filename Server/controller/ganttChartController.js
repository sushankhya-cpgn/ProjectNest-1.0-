const GanttChart = require("../model/ganttChartModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Week = require("../model/weekModel");
const User = require("../model/userModel");

exports.addGanttChartTask = catchAsync(async (req, res, next) => {
  const { weekNo } = req.params;
  const { task } = req.body;
  if (!task) return next(new AppError(400, "please provide task to add"));
  const projectGanttChart = await GanttChart.findById(req.project.ganttChart);
  if (!projectGanttChart)
    return next(
      new AppError(
        400,
        "this project does not have a gantt chart, please create one to perform this action"
      )
    );
  const ganttChartWeek = projectGanttChart.weeks.find(
    (wk) => +wk.weekNo === +weekNo
  );
  if (!ganttChartWeek)
    return next(new AppError(400, "cannot find week with that week no"));

  const week = await Week.findById(ganttChartWeek.week.toString());
  week.tasksToDo.push(task);
  projectGanttChart.tasks.push(task);
  projectGanttChart.lastUpdatedBy = req.user.id;
  await week.save();
  await projectGanttChart.save();
  await projectGanttChart.populate({
    path: "weeks.week",
    model: "Week",
  });
  await projectGanttChart.populate({
    path: "lastUpdatedBy",
    model: "User",
    select: "_id email firstName",
  });
  res.status(200).json({
    status: "success",
    ganttChart: projectGanttChart,
  });
});
