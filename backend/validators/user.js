const { body } = require("express-validator");
const { prisma } = require("../lib/prisma");

exports.register = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be an email")
    .custom(async (value) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: value,
        },
      });
      if (existingUser) {
        // Will use the below as the error message
        throw new Error("A user already exists with this e-mail address");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password length must be a minimum of 8"),
  body("passwordConfirmation")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers")
    .custom(async (value) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          name: value,
        },
      });
      if (existingUser) {
        throw new Error("A user already exists with this username");
      }
    }),
];
