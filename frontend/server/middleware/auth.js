const passport = require("passport");

module.exports.required = [
  passport.authenticate("jwt", {
    session: false,
  }),
];
module.exports.optional = passport.authenticate(["jwt", "anonymous"], {
  session: false,
});
