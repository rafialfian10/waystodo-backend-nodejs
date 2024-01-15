const express = require("express");
const router = express.Router();

const todo = require("./todo");
const category = require("./category");

todo(router);
category(router);

module.exports = router;
