const userModule = require("../../modules/users/user.module");
const catchAsync = require("../../utils/catch.error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AppError = require("./../../utils/app.error");

// jwt
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  const newUserModule = new userModule();
  const data = req.body;
  const salt = 10;
  data.password = await bcrypt.hash(data.password, salt);
  data.passwordConfirm = await bcrypt.hash(data.passwordConfirm, salt);
  const newUser = await newUserModule.createUser(data);
  const token = signToken(newUser.id);
  res.status(200).json({
    status: "success",
    token,
    data: newUser,
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const newUserModule = new userModule();
  const users = await newUserModule.getUsers();
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const newUserModule = new userModule();
  const user = await newUserModule.getUser({ id: userId });
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const newUserModule = new userModule();
  const user = await newUserModule.getUser({ email: email });
  if (
    !user ||
    !(await newUserModule.checkValidPassword(password, user.password))
  ) {
    return next(new AppError("Incorrect email or password", 400));
  }
  const token = signToken(user.id);

  res.status(200).json({
    status: "success",
    token: token,
  });
});
