const { Types } = require("mongoose");
const { Schema, model } = require("mongoose");

const { ObjectId } = Types;

const roomsSchema = Schema({
  roomNumber: {
    type: Number,
    required: true,
  },
  noOfBed: {
    type: Number,
    required: true,
  },
  availabel: {
    type: Boolean,
    default: true,
  },
  used: {
    type: Number,
    required: true,
  },
  bookedFrom: {
    type: String,
    default: "",
  },
  bookedTill: {
    type: String,
    default: "",
  },
  bookerIds: { type: [] },
  bhavanId: {
    type: ObjectId,
    required: true,
  },
});

const roomsModal = model("actualRooms", roomsSchema);

module.exports = roomsModal;
