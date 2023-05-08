const express = require("express");
require("dotenv").config({ path: "./.env" });

const app = express();

app.get("/", (req, res) => {
  res.end("abcàdsfaaaaaaaa  bbbnnn");
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
