const express = require('express');
const router = express.Router();

const pingRoutes = require('./ping');
const authorizationRoutes=require('./authorization')
const nonProfitRoutes=require("./nonProfit")
const userRoutes=require("./user")

pingRoutes(router);
authorizationRoutes(router)
nonProfitRoutes(router)
userRoutes(router)

module.exports = router;