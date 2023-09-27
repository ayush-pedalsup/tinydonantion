const { handleError, sendres } = require("../utils/helper");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const jwt = require("jsonwebtoken");

const isAuthorized = async (req, res, next) => {
  try {
    const sign = req.headers.authorization;
    if (sign) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.secret_key);
      req.token = decoded;
      req.userId = decoded.userId;
      return next(); // Move to the next middleware or route handler
    }
    return sendres(400, { message: "No Authorization Found" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  isAuthorized,
};
