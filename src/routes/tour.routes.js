const express = require("express");
const tour = require("../controllers/tours/tour.controller");
const auth = require("../controllers/users/auth.controller");

const tourRouter = express.Router();

tourRouter.route("/").get(auth.protect, tour.getTours).post(tour.createTour);
tourRouter.route("/monthly-plan").get(tour.getMonthlyPlan);
tourRouter.route("/import-data").post(tour.importTourData);
tourRouter
  .route("/:id")
  .get(tour.getTour)
  .put(tour.updateTour)
  .delete(tour.deleteTour);

module.exports = tourRouter;
