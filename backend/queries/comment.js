const prisma = require("../lib/prisma").public;

exports.createComment = async (data) => {
  const comment = await prisma.comment.create({
    data: data,
  });
  return comment;
};

exports.createReply = async (data) => {
  const reply = await prisma.comment.create({
    data: data,
  });
};
