const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  addProperty,
  getPropertyList,
  updatePropety,
  deleteProperty,
} = require("../Services/Property/property");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const propertyFile = multer({ storage }).array("img");

router.post("/add", propertyFile, addProperty);
router.get("/", getPropertyList);
router.put("/", propertyFile, updatePropety);
router.delete("/", deleteProperty);

module.exports = router;
