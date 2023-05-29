const express = require("express");
const user = require("../controllers/users/user.controller");
const auth = require("../controllers/users/auth.controller");

const userRouter = express.Router();

userRouter.route("/").post(user.createUser).get(user.getUsers);
userRouter.route("/:id").get(user.getUser);
userRouter.route("/login").post(user.loginUser);
userRouter.route("/forgot-password").post(auth.forgotPassword);
userRouter.route("/reset-password").patch(auth.resetPassword);

module.exports = userRouter;
