const express = require("express");
require("dotenv").config({ path: "../.env" });
const tourRoutes = require("./routes/tour.routes");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/tours", tourRoutes);

module.exports = app;
