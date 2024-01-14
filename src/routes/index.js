const express = require("express");
const router = express.Router();

const category = require("./category");

category(router);

module.exports = router;
