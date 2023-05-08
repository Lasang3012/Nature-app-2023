const express = require("express");
require("dotenv").config({ path: "./.env" });
const tourRoutes = require("./routes/tour.routes");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes
app.use("/tours", tourRoutes);

module.exports = app;
