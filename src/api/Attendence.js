const express = require("express");

const LabourAttendece = require("../Services/LabourAttendence/LabourAttendence");

const router = express.Router();

router.get("/:id/:firstDay/:lastDay", LabourAttendece.getAttendence);

module.exports = router;
