const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY_BUCKET,
  secretAccessKey: process.env.AWS_SECRET_BUCKET,
  region: process.env.AWS_REGION_BUCKET,
});

exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3BUCKET,
    key: function (req, file, cb) {
      var endEx = file.mimetype.split("/")[1];
      cb(null, parseInt(Date.now()) + endEx);
    },
    acl: "public-read",
  }),
});
