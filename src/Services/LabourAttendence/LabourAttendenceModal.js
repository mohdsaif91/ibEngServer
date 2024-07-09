const mongoose = require("mongoose");

const attendenceModal = mongoose.Schema({
  attendenceDate: {
    type: Date,
    required: true,
  },
  labourId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  present: {
    type: Number,
    required: true,
    default: 0,
  },
});

const AttendenceModal = mongoose.model("Attendence", attendenceModal);

module.exports = AttendenceModal;
