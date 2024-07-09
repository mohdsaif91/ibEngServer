const LabourModal = require("./LabourModal");
const LabourAttendenceModal = require("../../Services/LabourAttendence/LabourAttendenceModal");

const addLabour = async (req, res) => {
  try {
    await LabourModal.insertMany(req.body)
      .then((dbRes) => {
        res.status(201).send(dbRes);
      })
      .catch((err) => {
        throw "labour insert Operation failed";
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getLabourList = async (req, res) => {
  try {
    await LabourModal.find({})
      .then((dbRes) => {
        res.status(200).send(dbRes);
      })
      .catch((err) => {
        throw "get Operation failed";
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const markAttendence = async (req, res) => {
  try {
    console.log(req.body);
    await LabourAttendenceModal.replaceOne(
      {
        labourId: req.body.data,
        attendenceDate: req.body.date,
      },
      {
        labourId: req.body.data,
        attendenceDate: req.body.date,
        present: 1,
      },
      { upsert: true }
    ).then(async (findeOneRes) => {
      if (findeOneRes) {
        res.status(200).send({ data: "present", exist: true });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addLabour,
  getLabourList,
  markAttendence,
};
