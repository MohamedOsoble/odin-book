const { prisma } = require("../lib/prisma");
const { validate, generate } = require("../lib/password");

exports.newUser = async (username, email, password) => {
  const { salt, hash } = generate(password);
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      salt: salt,
      hash: hash,
    },
  });
  return user;
};

exports.all = async () => {
  console.log("Finding all users...");
  const users = await prisma.user.findMany();
  return users;
};
