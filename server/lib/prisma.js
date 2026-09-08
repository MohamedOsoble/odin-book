require("dotenv").config();
const { PrismaClient } = require("../generated/prisma");

const { PrismaPg } = require("@prisma/adapter-pg");

const DATABASE_URL =
  process.env.ENV === "production"
    ? process.env.PRODUCTION_DB_URL
    : process.env.DEV_DB_URL;

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
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
