const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class TourModule {
  constructor() {}

  async getTours() {
    const tours = await prisma.tour.findMany();
    return tours;
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

  async deleteTour(tourId) {
    await prisma.tour.delete({
      where: {
        id: tourId,
      },
    });
  }
};
