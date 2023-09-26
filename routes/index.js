const express = require("express");
const router = express.Router();

const pingRoutes = require("./mobile/ping");
const authorizationRoutes = require("./mobile/authorization");
const nonProfitRoutes = require("./mobile/nonProfit");
const userRoutes = require("./mobile/user");
const donationRoutes = require("./mobile/donation");
const adminRoutes=require("./admin/admin")


pingRoutes(router);
authorizationRoutes(router);
nonProfitRoutes(router);
userRoutes(router);
donationRoutes(router);
adminRoutes(router);

module.exports = router;
