const AppError = require("../../utils/app.error");
const sendMail = require("../../utils/email.handler");
const catchAsync = require("../../utils/catch.error");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const newUserModule = new userModule();
  const user = await newUserModule.getUser({ email: req.body.email });
  if (!user) {
    return next(new AppError("User not found.", 404));
  }
  const resetTokenData = newUserModule.createPasswordResetToken();
  await newUserModule.updateUser(user.id, {
    ...resetTokenData,
  });
  // 3) send it to user email
  const resetToken = resetTokenData.passwordResetToken;
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/users/reset-password/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    const sendEmail = async (emailOptions) => {
      const emailTransporter = await sendMail();
      await emailTransporter.sendMail(emailOptions);
    };
    sendEmail({
      subject: "Your password reset token (valid for 10 min)",
      text: message,
      to: req.body.email,
      from: process.env.EMAIL_SENDER,
    });
    res.status(200).json({
      status: "success",
      message: "Token send to mail",
    });
  } catch (e) {
    console.log(e);
    await newUserModule.updateUser(user.id, {
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  next();
});
