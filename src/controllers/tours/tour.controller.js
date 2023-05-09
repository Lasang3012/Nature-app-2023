const tourModule = require("../../modules/tours/tour.module");

exports.getTours = async (req, res) => {
  const newTourModule = new tourModule();
  const tours = await newTourModule.getTours();
  console.log(tours);
  res.status(200).json({
    status: "success",
    data: tours,
  });
};

exports.getTour = async (req, res) => {
  const newTourModule = new tourModule();
  const tourId = req.params.id;
  const tour = await newTourModule.getTour(tourId);
  res.status(200).json({
    status: "success",
    data: tour,
  });
};

exports.createTour = async (req, res) => {
  const newTourModule = new tourModule();
  const data = req.body;
  const newTour = await newTourModule.createTour(data);
  res.status(200).json({
    status: "success",
    data: newTour,
  });
};

exports.updateTour = async (req, res) => {
  const tourId = req.params.id;
  const newTourModule = new tourModule();
  const newTour = await newTourModule.updateTour(tourId);
  res.status(200).json({
    status: "success",
    data: newTour,
  });
};

exports.deleteTour = async (req, res) => {
  const newTourModule = new tourModule();
  const newTour = await newTourModule.deleteTour();
  res.status(200).json({
    status: "success",
  });
};
