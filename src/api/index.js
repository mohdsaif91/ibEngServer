const express = require("express");

const property = require("./Property");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/property", property);

module.exports = router;
