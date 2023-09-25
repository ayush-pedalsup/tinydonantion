const { handleError, sendres } = require("../utils/helper");
const isloggedIn = async (req, res,next) => {
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

module.exports =  isloggedIn ;