require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const DbPrivate = require("./prisma").private;
const DbPublic = require("./prisma").public;
const JwtStrategy = require("passport-jwt").Strategy;
const validatePassword = require("./password.js").validate;

const cookieExtractor = function (req) {
  if (req.cookies["jwt"]) {
    const cookie = req.cookies?.["jwt"]["token"].split(" ");
    return cookie[0];
  }
  return null;
};

// JWT Options
const JWTOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

// Local Strategy for login
passport.use(
  new LocalStrategy(async function verifyCallback(username, password, done) {
    try {
      const user = await DbPrivate.user.findUnique({
        where: { username: username },
      });
      if (!user) {
        return done(null, false);
      }

      const isValid = validatePassword(password, user.salt, user.hash);
      if (isValid) {
        return done(null, {
          id: user.id,
          email: user.email,
          username: user.username,
        });
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }),
);

// JWT Strategy for auth -- No password verification so use public db to not leak salt/hash

passport.use(
  new JwtStrategy(JWTOptions, async function (jwt_payload, done) {
    const user = await DbPublic.user.findFirst({
      where: {
        id: jwt_payload.sub,
      },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }),
);
