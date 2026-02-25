const { prisma } = require("../lib/prisma");
const issueJWT = require("../lib/jwt").issue;
const passport = require("passport");
const validate = require("../validators/user");
const { validationResult, matchedData } = require("express-validator");

exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(400).json({
        message: "Incorrect user credentials, please check and try again",
        user: user,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Something went wrong with the request, please try again",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const tokenObject = issueJWT(user);
      res.cookie("jwt", tokenObject, {
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.json({
        message: "Login successful",
        user: { id: user.id, username: user.name },
        tokenObject,
      });
    });
  })(req, res);
};

exports.logout = (req, res) => {
  if (req.cookies["jwt"]) {
    res.clearCookie("jwt").status(200).json({
      message: "You have logged out",
    });
  } else {
    res.status(401).json({
      error: "Invalid jwt",
    });
  }
};

exports.isLoggedIn = (req, res) => {
  return res.json("Is logged in route");
};

exports.register = [
  validate.register,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return res.json("register route received and form valid");
  },
];
