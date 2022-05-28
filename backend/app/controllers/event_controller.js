import Event from "../models/Event.js";

export const get_event = async (req, res, next) => {
  try {
    const { event_id } = req.params;
    let event = await Event.findOne({ _id: event_id });
    return res.status(200).json(event);
  } catch (err) {
    return next(err);
  }
};

export const get_events = async (req, res, next) => {
  try {
    let events = await Event.find({});

    return res.status(200).json(events);
  } catch (err) {
    return next(err);
  }
};
