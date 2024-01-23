const express = require("express");

const property = require("./Property");
const Inquery = require("./Inquery");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/property", property);
router.use("/inquery", Inquery);

module.exports = router;
