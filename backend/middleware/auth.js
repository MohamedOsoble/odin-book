const passport = require("passport");

module.exports.required = [
  // function (req, res, next) {
  //   console.log("Authenticating user...");
  //   console.log(req.cookies["jwt"]);
  //   console.log(req.cookies);
  //   next();
  // },
  passport.authenticate("jwt", {
    session: false,
  }),
];
module.exports.optional = passport.authenticate(["jwt", "anonymous"], {
  session: false,
});
