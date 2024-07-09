const express = require("express");

const Login = require("../Services/Login/Login");

const router = express.Router();

router.post("/", Login.login);

module.exports = router;
