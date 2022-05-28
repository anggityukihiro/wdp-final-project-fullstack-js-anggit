import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EventSchema = new Schema({
    name: {
        type: String,
    },
  });
  

const Event = model("Event" , EventSchema);

export default Event;
