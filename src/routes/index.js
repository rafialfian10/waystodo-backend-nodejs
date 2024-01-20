const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const todo = require("./todo");
const category = require("./category");

auth(router);
user(router);
todo(router);
category(router);

module.exports = router;
