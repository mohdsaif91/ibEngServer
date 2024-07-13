const authModal = require("./LoginModal");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      throw { msg: "User name and Password is required", status: 400 };
    }
    const user = await authModal.findOne({ email: userName });
    console.log(user);
    if (!user) {
      return res.status(400).send("no User Found");
    }
    if (user.password === password) {
      return res.status(200).send(user);
    } else {
      return res.status(400).send("no User Found");
    }
  } catch (error) {
    res.send(error);
  }
};

const addStaff = async (req, res) => {
  try {
    await authModal
      .insertMany({ ...req.body })
      .then((insertRes) => {
        res.status(201).send(insertRes);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getStaff = async (req, res) => {
  try {
    await authModal
      .find({ role: "staff" })
      .then((getRes) => {
        res.status(200).send(getRes);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStaff = async (req, res) => {
  try {
    if (!req.params.id) {
      throw "Id is required for updating";
    }
    await authModal
      .findOneAndDelete({ _id: req.params.id })
      .then((deleteRes) => {
        res.status(200).send(req.params.id);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    await authModal
      .findOneAndUpdate({ _id: req.body._id }, { ...req.body })
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

const updatePassword = async (req, res) => {
  try {
    await authModal
      .findOneAndUpdate({ _id: req.body._id }, { password: req.body.password })
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
  addStaff,
  login,
  getStaff,
  deleteStaff,
  updatePassword,
  updateProfile,
};
