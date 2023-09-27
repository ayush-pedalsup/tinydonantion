const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

AdminSchema.methods.sanitize = function () {
  var admin = this;
  admin = admin.toObject();

  delete admin.createdAt;
  delete admin.updatedAt;
  delete admin.isDeleted;

  return admin;
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = { Admin };
