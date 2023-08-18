const express = require('express');
const router = express.Router();

const pingRoutes = require('./ping');

pingRoutes(router);

module.exports = router;