const express = require("express");
const user = require("../controllers/users/user.controller");

const userRouter = express.Router();

userRouter.route("/").post(user.createUser).get(user.getUsers);
userRouter.route("/:id").get(user.getUser);
userRouter.route("/login").post(user.loginUser);

module.exports = userRouter;
