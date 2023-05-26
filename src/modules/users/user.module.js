const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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

  async updateUser(userId, data) {
    try {
      console.log(data);
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...data,
        },
      });
      return user;
    } catch (e) {
      console.log("Can not update user");
    }
  }

  createPasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return { passwordResetToken, passwordResetExpires };
  }
};
