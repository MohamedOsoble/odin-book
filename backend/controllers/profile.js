const dbProfile = require("../queries/profile");
const dbUser = require("../queries/user");
const validate = require("../validators/post");

// Dont think this will be needed
exports.getProfile = async (req, res, next) => {
  const user = dbUser.getUser(req.params.username);
  const profileData = await dbProfile.getProfile(user.id);
  return res.status(200).json(profileData);
};

exports.update = async (req, res, next) => {
  const profile = await db.updateProfile(req.body.profile);
  return res.status(200).json(profile);
};
