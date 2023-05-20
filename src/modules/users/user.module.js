const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

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

  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUser(data) {
    const user = await prisma.user.findFirst({
      where: {
        id: data?.id ? data.id : undefined,
        email: data?.email ? data.email : undefined,
      },
    });
    return user;
  }

  async checkValidPassword(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
};
