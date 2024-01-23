const mongoose = require("mongoose");

const InquerySchema = mongoose.Schema(
  {
    message: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const inquery = mongoose.model("inquery", InquerySchema);
module.exports = inquery;
