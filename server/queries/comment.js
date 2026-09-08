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
  return reply;
};

exports.deleteComment = async (commentId) => {
  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return comment;
};

exports.getComment = async (commentId) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });
  return comment;
};
