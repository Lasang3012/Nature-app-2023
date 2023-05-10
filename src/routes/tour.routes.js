const express = require("express");
const tour = require("../controllers/tours/tour.controller");

const router = express.Router();

router.param("id", (req, res, next, value) => {
  next();
});

router.route("/").get(tour.getTours).post(tour.createTour);
router.route("/import-data").post(tour.importTourData);
router
  .route("/:id")
  .get(tour.getTour)
  .put(tour.updateTour)
  .delete(tour.deleteTour);

module.exports = router;
