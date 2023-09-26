const { handleError, sendres } = require("../../utils/helper");
const passport = require("passport");
const User = require("../../models/User");

const authFailure = async (req, res) => {
  try {
    sendres(400, { message: "Something Went Wrong!" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const initialize = async (req, res) => {
  try {
    await passport.authenticate("google", {
      scope: ["email", "profile"],
    });
  } catch (err) {
    handleError(err, res);
  }
};

const authProtected = async (req, res) => {
  try {
    let name = req.user.displayName;
    let email = req.user.email;
    if (email) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        const status = findUser._doc.isRestricted;
        if (status) {
          return sendres(400, { message: "The user is restricted" }, res);
        }
      }
    }
    return sendres(200, { message: `Hello ${name}` }, res);
  } catch (err) {
    handleError(err, res);
  }
};
const logout = async (req, res) => {
  try {
    req.session.destroy();
    sendres(201, { message: "See you again" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const authenticate = async (req, res) => {
  try {
    passport.authenticate("google", {
      successRedirect: "/auth/protected",
      failureRedirect: "/auth/google/failure",
    });
  } catch (err) {
    handleError(err, res);
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        return sendres(200, { findUser }, res);
      }
      return sendres(
        400,
        { message: "User with the registered email not find" },
        res
      );
    }
    return sendres(400, { message: "email is required" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const getAllUser = async (req, res) => {
  try {
    const findAllUser = await User.find();
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
        return sendres(200, { message: "User Sucessfully restricted" }, res);
      }
      return sendres(400, { message: "User not found" }, res);
    }
    return sendres(400, { message: "email is required" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  authFailure,
  authProtected,
  logout,
  initialize,
  authenticate,
  getUser,
  getAllUser,
  restrictUser,
};
