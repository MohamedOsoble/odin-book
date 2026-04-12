require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");

const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const private = new PrismaClient({ adapter });
const public = new PrismaClient({
  adapter,
  omit: {
    user: {
      salt: true,
      hash: true,
    },
  },
});

module.exports = { private, public };
