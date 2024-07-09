const express = require("express");

const Room = require("../Services/Room/Room");

const router = express.Router();

router.post("/addRoom", Room.addRoom);
router.get("/", Room.getRoom);
router.get("/count", Room.getRoomCount);
router.put("/updateRoom", Room.updateRoom);
router.delete("/:deleteId", Room.deleteRoom);
router.get("/viewSingleBooking/:roomId", Room.viewSingleRoom);

module.exports = router;
