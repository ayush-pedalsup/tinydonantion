const { handleError, sendres } = require("../../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./../.env") });
const { Admin } = require("../../models/admin");

const signup = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;

    if (!name || !email || !password || !mobileNumber) {
      return sendres(400, { message: "All fields are required" }, res);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const isUser = await Admin.find({ email });
    if (isUser.length > 0) {
      return sendres(
        400,
        { message: "User with the same email already exist" },
        res
      );
    }
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
    });
    await newAdmin.save();
    sendres(200, { message: "successfully registered" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return sendres(400, { message: "Password is required" }, res);
    }
    const checkIfExisting = await Admin.findOne({ email });
    if (checkIfExisting) {
      const isPasswordSame = bcrypt.compareSync(
        password,
        checkIfExisting._doc.password
      );
      if (isPasswordSame) {
        const payload = {
          email,
          userId: checkIfExisting._id, // Include the user's ObjectID here
        };
        const token = jwt.sign(payload, process.env.secret_key, {
          expiresIn: "1d",
        });
        return sendres(200, { message: "successfully Logged In", token }, res);
      }
      return sendres(400, { message: "Incorrect Password" }, res);
    }
    return sendres(400, { message: "Not existing User, Please signin" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { signup, signin };
