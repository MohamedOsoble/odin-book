require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { prisma } = require("./prisma");
const JwtStrategy = require("passport-jwt").Strategy;
const validatePassword = require("./password.js").validate;

const cookieExtractor = function (req) {
  let token = "";
  if (req.cookies["jwt"]) {
    const cookie = req.cookies?.["jwt"]["token"].split(" ");
    token = cookie[0];
  }
  return token;
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
      const user = await prisma.user.findUnique({
        where: { username: username },
      });
      if (!user) {
        return done(null, false);
      }

      const isValid = validatePassword(password, user.salt, user.hash);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }),
);

// JWT Strategy for auth

passport.use(
  new JwtStrategy(JWTOptions, async function (jwt_payload, done) {
    return await prisma.user
      .findFirst({
        where: { id: jwt_payload.sub },
      })
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  }),
);
