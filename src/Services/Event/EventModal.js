const mongoose = require("mongoose");

const eventModal = mongoose.Schema({
  eventStartDate: {
    type: Date,
    required: true,
  },
  eventEndDate: {
    type: Date,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventVenue: {
    type: String,
    required: true,
  },
  speakerName: {
    type: String,
    required: true,
  },
});

const EventModal = mongoose.model("event", eventModal);

module.exports = EventModal;
