const issueJWT = require("../lib/jwt").issue;
const passport = require("passport");
const validate = require("../validators/user");
const { auth } = require("./auth");
const db = require("../queries/user");
const { validationResult, matchedData } = require("express-validator");

exports.login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(401).json({
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
      success: true,
      message: "You have logged out",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Login session already expired",
    });
  }
};

exports.checkAuth = (req, res) => {
  return res.status(200).json({
    id: req.cookies["jwt"]["id"],
    username: req.user.username,
  });
};

exports.register = [
  validate.register,
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = await db.newUser(
      req.body.username,
      req.body.email,
      req.body.password,
    );
    return res.status(400).json({
      message: "Successfully registered",
      data: {
        id: user.id,
        username: user.username,
      },
    });
  },
];
