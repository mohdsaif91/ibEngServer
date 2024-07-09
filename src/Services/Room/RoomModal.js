const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  bhavanName: { type: String, required: true },
  noOfBedperRoom: { type: Number, required: true },
  landmark: { type: String, required: true },
  totalNoOfRooms: { type: Number, required: true },
  roomAmount: { type: String, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const roomModal = mongoose.model("room", roomSchema);

module.exports = roomModal;
