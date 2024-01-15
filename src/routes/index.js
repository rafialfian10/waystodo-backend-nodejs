const express = require("express");
const router = express.Router();

const user = require("./user");
const todo = require("./todo");
const category = require("./category");

user(router);
todo(router);
category(router);

module.exports = router;
