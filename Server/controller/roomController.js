const Project = require("../model/projectModel");
const Room = require("../model/roomModel");
const Message = require("../model/messageModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.sendRoomMessage = catchAsync(async (req, res, next) => {
  //checking if the room exits
  const room = await Room.findById(req.params.id);
  if (!room) return next(new AppError(404, "could not find room with that id"));

  //checking if the sender is member of room
  if (!room.members.includes(req.user.id))
    return next(
      new AppError(
        400,
        "you cannot send message in this room because you are not a member of this room"
      )
    );

  const messageData = {
    content: req.body.content,
    room: req.params.id,
    sender: req.user.id,
  };
  const message = await Message.create(messageData);
  if (!message)
    return next(new AppError(400, "could not send message please try again"));
  res.status(200).json({
    status: "success",
    message: "message sent to the room",
  });
});

exports.getRoomMessages = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) return next(404, "cannot find room with that id");

  if (!room.members.includes(req.user.id))
    return next(
      new AppError(
        401,
        "cannot access messages, you are not the member of this room"
      )
    );

  const page = req.query.page || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const messages = await Message.find({ room: req.params.id })
    .skip(skip)
    .limit(limit)
    .sort("-createdAt");
  res.status(200).json({
    status: "success",
    message: "latest message at the first of array",
    total: messages.length,
    data: {
      messages,
    },
  });
});
// populate sender with their name, all all
