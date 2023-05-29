const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class TourModule {
  constructor() {}

  async getTours(queryObject) {
    try {
      const page = parseInt(queryObject.page);
      const limit = parseInt(queryObject.limit);
      const tours = await prisma.tour.findMany({
        take: limit,
        skip: (page - 1) * limit,
      });
      return tours;
    } catch (err) {
      console.log(err);
    }
  }

  async getTour(tourId) {
    const tour = await prisma.tour.findFirst({
      where: {
        id: tourId,
      },
    });
    return tour;
  }

  async createTour(data) {
    const newTour = await prisma.tour.create({
      data: {
        ...data,
      },
    });
    return newTour;
  }

  async deleteTour(tourId) {
    prisma.$use(async (params, next) => {
      console.log(params);
      if (params.model == "Tour") {
        if (params.action == "delete") {
          params.action = "update";
          params.args["data"] = { status: "inactive" };
        }
      }
      return next(params);
    });

    await prisma.tour.delete({
      where: {
        id: tourId,
      },
    });
  }

  async updateTour(tourId) {
    const tour = await prisma.tour.update({
      where: {
        id: tourId,
      },
      data: {
        ...req.body,
      },
    });
    return tour;
  }

  async getMonthlyPlan() {
    const result = await prisma.$queryRaw`
      WITH derived AS (
        SELECT unnest(t.start_dates) AS start_date, t."name"
        FROM tour t
      )
      SELECT month,
            array_agg("name") AS names, count(name)
      FROM (
        SELECT DATE_TRUNC('month', derived.start_date::date) AS month,
              derived."name"
        FROM derived
      ) subquery
      GROUP BY month;
    `;
    result.map((el) => (el.count = parseInt(el.count)));
    return result;
  }
};
