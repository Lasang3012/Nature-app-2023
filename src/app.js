const express = require("express");
require("dotenv").config({ path: "../.env" });
const tourRoutes = require("./routes/tour.routes");
const userRoutes = require("./routes/user.routes");
const morgan = require("morgan");
const AppError = require("./utils/app.error");
const globalError = require("./utils/controller.error");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/tours", tourRoutes);
app.use("/users", userRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalError);

module.exports = app;
