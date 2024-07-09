const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  userName: {
    require: true,
    type: String,
  },
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
});

const authModal = mongoose.model("loginAuth", authSchema);

module.exports = authModal;
