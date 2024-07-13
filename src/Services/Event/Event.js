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
      .sort({ eventStartDate: -1 })
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

const deleteEvent = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "Delete Id is required";
    }
    await EventModal.findOneAndDelete({ _id: req.params.id })
      .then((deleteRes) => {
        res.status(200).send(req.params.id);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const editEvent = async (req, res) => {
  try {
    await EventModal.findOneAndUpdate({ _id: req.body._id }, { ...req.body })
      .then((updateRes) => {
        res.status(200).send(req.body);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addEvent,
  deleteEvent,
  editEvent,
  getEvent,
};
