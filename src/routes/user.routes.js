const express = require("express");

const user = require("../controllers/users/user.controller");

const router = express.Router();

router.route("/").post(user.createUser);

module.exports = router;
  