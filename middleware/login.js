const User = require("../models/User");
const { handleError, sendres } = require("../utils/helper");
const isloggedIn = async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      next();
    }
    return sendres(401, { message: "Please login in" }, res);
  } catch (err) {
    handleError(err, res);
  }
};
const isRestricted = async (req, res, next) => {
  try {
    const email = req.user.email;
    if (email) {
      const findUser = await User.findOne({ email });
      if (findUser) {
        const status = findUser.isRestricted;
        if (!status) {
          return next();
        }
        return sendres(400, { message: "The user is restricted" }, res);
      }
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { isloggedIn, isRestricted };
