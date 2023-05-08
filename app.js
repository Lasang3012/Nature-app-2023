const express = require("express");
require("dotenv").config({ path: "./.env" });
const tourRoutes = require("./routes/tour.routes");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "dev") {
  console.log(process.env.NODE_ENV + "neu la dev");
  app.use(morgan("dev"));
}
console.log(process.env.NODE_ENV + "neu la pro");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes
app.use("/tours", tourRoutes);

module.exports = app;
