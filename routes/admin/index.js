const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin");

adminRoutes(router);

module.exports = router;
