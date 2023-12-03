const Event = require('../models/event');
const User = require('../models/user');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');



exports.getEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate('user_id', 'name avatar')
      .sort({ start_time: 1 });

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler('Failed to retrieve events', 500));
  }
});


exports.getSingleEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId).populate('user_id', 'name avatar');

    if (!event) {
      return next(new ErrorHandler('Event not found', 404));
    }

    res.status(200).json({
      success: true,
      event,
    });

  } catch (error) {
    return next(new ErrorHandler('Failed to retrieve event', 500));
  }
});


