const mongoose = require("mongoose");

const PropertySchema = mongoose.Schema(
  {
    projectName: {
      require: true,
      type: String,
    },
    description: {
      require: true,
      type: String,
    },
    mainImage: { type: String, require: true },
    images: { type: [], require: true },
    background: { type: String, require: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const Property = mongoose.model("property", PropertySchema);

module.exports = Property;
