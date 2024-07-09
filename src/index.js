const Mongoose = require("mongoose");

const app = require("./app");
const db = require("./config/db");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  db()
    .then((res) => {
      console.log(`Listening: http://localhost:${port} DB connected !`);
    })
    .catch((err) => {
      console.log(err);
    });
});
