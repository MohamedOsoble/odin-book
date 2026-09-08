const jwt = require("jsonwebtoken");

module.exports.issue = (user) => {
  const id = user.id;
  const expiresIn = "1d";
  const payload = {
    sub: id,
    iat: Date.now(),
    role: user.role,
  };

  const signedToken = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: expiresIn,
  });

  return {
    token: signedToken,
    id: payload.sub,
    issuedAt: payload.iat,
    role: payload.role,
  };
};
