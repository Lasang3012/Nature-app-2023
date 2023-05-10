const fs = require("fs");
const tourModule = require("../../modules/tours/tour.module");

class TourQuery {
  constructor({ page, limit, name, duration }) {
    this.page = page;
    this.limit = limit;
    this.name = name;
    this.duration = duration;
  }
}

exports.getTours = async (req, res) => {
  const newTourModule = new tourModule();
  const queryAb = new TourQuery({ ...req.query });
  console.log(queryAb);

  const tours = await newTourModule.getTours({ ...queryAb });
  res.status(200).json({
    status: "success",
    data: tours,
  });
};

exports.importTourData = (req, res) => {
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
  tours.map((tour) => {
    newTourModule.createTour({
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
    });
  });

  res.status(200).json({
    status: "success",
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

exports.getMonthlyPlan = async (req, res) => {
  const newTourModule = new tourModule();
  const result = await newTourModule.getMonthlyPlan();
  res.status(200).json({
    status: "success",
    data: result,
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
