import Event from "../models/Event.js";

export const get_events = async (req, res, next) => {
  try {
    let events = await Event.find({});

    return res.status(200).json(events);
  } catch (err) {
    return next(err);
  }
};
