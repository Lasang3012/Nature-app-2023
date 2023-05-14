const fs = require("fs");
const tourModule = require("../../modules/tours/tour.module");
const catchAsync = require("./../../utils/catch.error");

class TourQuery {
  constructor({ page, limit, name, duration }) {
    this.page = page;
    this.limit = limit;
    this.name = name;
    this.duration = duration;
  }
}

exports.getTours = async (req, res,next) => {
  const newTourModule = new tourModule();
  const queryAb = new TourQuery({ ...req.query });
  const tours = await newTourModule.getTours({ ...queryAb });
  res.status(200).json({
    status: "success",
    data: tours,
  });
};

exports.importTourData = catchAsync(async (req, res,next) => {
  // nếu file json bỏ cùng với file này thì dùng cách sau
  // const tours = JSON.parse(
  //   fs.readFileSync(
  //     `${__dirname}/tours-simple.json`,
  //     "utf-8"
  //   )
  // );
  const tours = JSON.parse(
    fs.readFileSync("./dev-data/tours-simple.json", "utf-8")
  );
  const newTourModule = new tourModule();
  tours.map(async (tour) => {
    await newTourModule.createTour({
      name: tour.name,
      duration: tour.duration,
      maxGroupSize: tour.maxGroupSize,
      difficulty: tour.difficulty,
      ratingsAverage: tour.ratingsAverage,
      ratingsQuantity: tour.ratingsQuantity,
      price: tour.price,
      summary: tour.summary,
      description: tour.description,
      imageCover: tour.imageCover,
      images: tour.images,
      startDates: tour.startDates,
    });
  });

  res.status(200).json({
    status: "success",
  });
});

exports.getTour = catchAsync(async (req, res,next) => {
  const newTourModule = new tourModule();
  const tourId = req.params.id;
  const tour = await newTourModule.getTour(tourId);
  res.status(200).json({
    status: "success",
    data: tour,
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTourModule = new tourModule();
  const data = req.body;
  const newTour = await newTourModule.createTour(data);
  res.status(200).json({
    status: "success",
    data: newTour,
  });
});

exports.getMonthlyPlan = catchAsync((async (req, res,next) => {
  const newTourModule = new tourModule();
  const result = await newTourModule.getMonthlyPlan();
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.updateTour = catchAsync(async (req, res,next) => {
  const tourId = req.params.id;
  const newTourModule = new tourModule();
  const newTour = await newTourModule.updateTour(tourId);
  res.status(200).json({
    status: "success",
    data: newTour,
  });
});

exports.deleteTour = catchAsync(async (req, res,next) => {
  const newTourModule = new tourModule();
  const newTour = await newTourModule.deleteTour();
  res.status(200).json({
    status: "success",
  });
});
