exports.createEvent = catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, start_time, user_id } = req.body;
  
      const event = await Event.create({
        name,
        description,
        start_time,
        user_id,
      });
  
      res.status(201).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler('Failed to create event', 500));
    }
  });
  
  exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
  
      const { name, description, start_time, user_id } = req.body;
  
      const event = await Event.findByIdAndUpdate(
        eventId,
        {
          name,
          description,
          start_time,
          user_id,
        },
        { new: true, runValidators: true }
      );
  
      if (!event) {
        return next(new ErrorHandler('Event not found', 404));
      }
  
      res.status(200).json({
        success: true,
        event,
      });
    } catch (error) {
      return next(new ErrorHandler('Failed to update event', 500));
    }
  });
  
  exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
  
      const event = await Event.findByIdAndDelete(eventId);
  
      if (!event) {
        return next(new ErrorHandler('Event not found', 404));
      }
  
      res.status(204).json({
        success: true,
        message: 'Event deleted successfully',
      });
    } catch (error) {
      return next(new ErrorHandler('Failed to delete event', 500));
    }
  });
  