const express = require("express");
const { addInquery, getInqueries } = require("../Services/Inquery/Inquery");

const router = express.Router();

router.post("/", addInquery);
router.get("/", getInqueries);

module.exports = router;
