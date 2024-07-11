const express = require("express");

const Login = require("../Services/Login/Login");

const router = express.Router();

router.post("/", Login.login);
router.post("/addStaff", Login.addStaff);

module.exports = router;
