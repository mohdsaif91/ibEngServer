const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();

const mongoUrl = process.env.MONGODB_URL;

const db = async () => {
  try {
    await mongoose
      .connect(mongoUrl)
      .then(() => {
        console.log(con.connection);
      })
      .catch((error) => error);
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
