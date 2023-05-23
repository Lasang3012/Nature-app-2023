const AppError = require("../../utils/app.error");
const catchAsync = require("../../utils/catch.error");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModule = require("../../modules/users/user.module");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("login to get access", 500));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const newUserModule = new userModule();
  const user = await newUserModule.getUser({ id: decoded.id });
  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = user;
  next();
});
