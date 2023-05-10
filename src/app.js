const express = require("express");
require("dotenv").config({ path: "../.env" });
const tourRoutes = require("./routes/tour.routes");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/tours", tourRoutes);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server !`);
  err.status = "failed";
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
