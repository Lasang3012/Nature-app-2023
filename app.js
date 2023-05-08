const express = require("express");
const fs = require("fs");
require("dotenv").config({ path: "./.env" });

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => {
    return el.id === id;
  });
  console.log(tour);
  res.status(200).json({
    status: "success",
    data: {
      tours: tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          tours: { newTour },
        },
      });
    }
  );
};

app.route("/tours").get(getTours).get(getTour);
app.route("/tours").post(createTour);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
