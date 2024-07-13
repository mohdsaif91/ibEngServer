const express = require("express");

const Login = require("../Services/Login/Login");

const router = express.Router();

router.post("/", Login.login);
router.post("/addStaff", Login.addStaff);
router.get("/getStaff", Login.getStaff);
router.delete("/deleteStaff/:id", Login.deleteStaff);
router.put("/updateProfile", Login.updateProfile);
router.put("/updatePassword", Login.updatePassword);

module.exports = router;
