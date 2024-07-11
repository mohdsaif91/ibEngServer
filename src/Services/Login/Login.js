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
    }
    throw { msg: "No user found 2", status: 400 };
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
    res.status(500).send(error);
  }
};

module.exports = {
  addStaff,
  login,
};
