const authModal = require("./LoginModal");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      throw { msg: "User name and Password is required", status: 400 };
    }
    const user = await authModal.findOne({ userName });
    console.log(user);
    if (!user) {
      throw { msg: "No user found", status: 400 };
    }
    if (user.password === password) {
      return res.status(200).send(user);
    }
    throw { msg: "No user found 2", status: 400 };
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  login,
};
