const userModule = require("../../modules/users/user.module");
const catchAsync = require("../../utils/catch.error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = catchAsync(async (req, res, next) => {
  const newUserModule = new userModule();
  const data = req.body;
  const salt = 10;
  data.password = await bcrypt.hash(data.password, salt);
  data.passwordConfirm = await bcrypt.hash(data.passwordConfirm, salt);
  const newUser = await newUserModule.createUser(data);
  // jwt

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: "success",
    token,
    data: newUser,
  });
});
