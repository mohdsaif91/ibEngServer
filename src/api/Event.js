const express = require("express");

const EventService = require("../Services/Event/Event");

const router = express.Router();

router.post("/add", EventService.addEvent);
router.get("/", EventService.getEvent);
router.delete("/delete/:id", EventService.deleteEvent);
router.put("/edit", EventService.editEvent);

module.exports = router;
