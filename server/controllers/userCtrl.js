const User = require("../models/userModel");

exports.getAllUsersCtrl = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get all users" });
  }
};

exports.getUserCtrl = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error get user" });
  }
};

exports.updateUserCtrl = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error update user" });
  }
};
