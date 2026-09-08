const { body } = require("express-validator");
const { prisma } = require("../lib/prisma");

exports.newPost = [
  body("authorId").custom(async (value) => {
    const validAuthor = await prisma.user.findUnique({
      where: {
        id: value,
      },
    });
    if (!validAuthor) {
      // Will use the below as the error message
      throw new Error(
        "Invalid Author ID supplied, this user cannot make a post",
      );
    }
  }),
  body("content")
    .notEmpty()
    .withMessage("Content must be supplied, cannot make an empty post")
    .isLength({ max: 300 })
    .withMessage("Max length of post is 300 characters..."),
];
