const LabourModal = require("./LabourAttendenceModal");

const getAttendence = async (req, res) => {
  try {
    if (!req.params.id || !req.params.firstDay || !req.params.lastDay) {
      throw "Id,first day or last is required for getting reqested data";
    }
    console.log(new Date("2024-07-06T18:30:00.000Z"));
    await LabourModal.find({
      labourId: req.params.id,
      $and: [
        { attendenceDate: { $gte: new Date(req.params.firstDay) } },
        { attendenceDate: { $lt: new Date(req.params.lastDay) } },
      ],
    })
      .then((findByIdRes) => {
        console.log(findByIdRes);
        res.status(200).send(findByIdRes);
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
  getAttendence,
};
