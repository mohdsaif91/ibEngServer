const express = require("express");
const multer = require("multer");

const Labour = require("../Services/Labour/Labour");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("labourIdProof");

const router = express.Router();

router.post("/add", upload, Labour.addLabour);
router.get("/", Labour.getLabourList);
router.post("/markAttendence", Labour.markAttendence);

module.exports = router;
