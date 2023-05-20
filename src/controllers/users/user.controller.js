const userModule = require("../../modules/users/user.module");
const catchAsync = require("../../utils/catch.error");
const bcrypt = require("bcryptjs");
const AppError = require("../../utils/app.error");

exports.createUser = catchAsync(async (req, res, next) => {
  const newTourModule = new userModule();
  const data = req.body;
  const salt = 10;
  data.password = await bcrypt.hash(data.password, salt);
  data.passwordConfirm = await bcrypt.hash(data.passwordConfirm, salt);
  const newTour = await newTourModule.createUser(data);
  res.status(200).json({
    status: "success",
    data: newTour,
  });
});
