const { handleError, sendres } = require("../../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./../.env") });
const { Admin } = require("../../models/admin");

const signup = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      mobileNumber,
    });
    await newAdmin.save();
    sendres(200, { message: "suceessfully registered" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
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
        return sendres(200, { message: "Sucessfully Logged In", token }, res);
      }
      return sendres(400, { message: "Incorrect Password" }, res);
    }
    return sendres(400, { message: "Not existing User, Please signin" }, res);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = { signup, signin };
