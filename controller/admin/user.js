const { handleError, sendres } = require("../../utils/helper");
const User = require("../../models/User");

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        return sendres(200, { findUser }, res);
      }
      return sendres(400, { message: "User not found" }, res);
    }
    return sendres(400, { message: "email is required" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const getAllUser = async (req, res) => {
  try {
    const findAllUser = await User.find({});
    console.log("ehhlo");
    if (findAllUser) {
      return sendres(200, { findAllUser }, res);
    }
  } catch (err) {
    handleError(err, res);
  }
};

const restrictUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        await User.updateOne(
          { email },
          { $set: { isRestricted: true } },
          { new: true }
        ).exec();
        req.session.destroy();
        return sendres(200, { message: "User successfully restricted" }, res);
      }
      return sendres(400, { message: "User not found" }, res);
    }
    return sendres(400, { message: "email is required" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    if (email) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        await User.updateOne(
          { email },
          { $set: { email, firstName, lastName } },
          { new: true }
        ).exec();
        return sendres(200, { message: "User Sucessfully updated" }, res);
      }
      return sendres(400, { message: "User not found" }, res);
    }
    return sendres(400, { message: "email is required" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getUser,
  getAllUser,
  restrictUser,
  updateUser,
};
