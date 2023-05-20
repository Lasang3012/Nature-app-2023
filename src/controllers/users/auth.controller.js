const AppError = require("../../utils/app.error");
const catchAsync = require("../../utils/catch.error");

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
  next();
});
