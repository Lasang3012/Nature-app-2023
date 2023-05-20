const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = class UserModule {
  constructor() {}

  async createUser(data) {
    const newUser = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return newUser;
  }
};
