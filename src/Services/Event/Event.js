const EventModal = require("./EventModal");

const addEvent = async (req, res) => {
  try {
    await EventModal.insertMany({
      ...req.body,
    })
      .then((eventRes) => {
        res.status(201).send(eventRes);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getEvent = async (req, res) => {
  try {
    await EventModal.find({})
      .then((getEventRes) => {
        res.status(200).send(getEventRes);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addEvent,
  getEvent,
};
