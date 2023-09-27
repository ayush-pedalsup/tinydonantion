const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    socialAuth: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "Users",
    timestamps: true,
    skipVersioning: true,
    versionKey: false,
  }
);

userSchema.methods.sanitize = function () {
  var User = this;
  User = User.toObject();
  delete User.createdAt;
  delete User.updatedAt;
  return User;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
