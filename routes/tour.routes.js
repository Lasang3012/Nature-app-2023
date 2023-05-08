const express = require("express");
const tour = require("../controllers/tour.controller");

const router = express.Router();

router.param("id", (req, res, next, value) => {
  console.log(value);
  next();
});

router.route("/").get(tour.getTours);
router.route("/:id").post(tour.createTour).get(tour.getTour);

module.exports = router;
