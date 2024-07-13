const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  password: {
    require: true,
    type: String,
  },
  role: {
    require: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  mobileNumber: {
    type: String,
    required: true,
    default: "9876543211",
  },
  email: {
    type: String,
    required: true,
    default: "abc@gmail.com",
  },
  fullName: {
    type: String,
    required: true,
  },
});

const authModal = mongoose.model("loginAuth", authSchema);

module.exports = authModal;
