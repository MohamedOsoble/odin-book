const dbProfile = require("../queries/profile");
const dbUser = require("../queries/user");
const validate = require("../validators/post");
const fm = require("../lib/fileManagement");

exports.getProfile = async (req, res, next) => {
  const user = dbUser.getUser(req.params.username);
  const profileData = await dbProfile.getProfile(user.id);
  return res.status(200).json(profileData);
};

exports.update = async (req, res, next) => {
  const profile = await dbProfile.updateProfile(req.body);
  return res.status(200).json(profile);
};

exports.newAvatar = async (req, res, next) => {
  const avatar = req.file;
  const username = req.params.username;
  const user = await dbUser.getUser(username);

  try {
    const newProfile = await dbProfile.updateAvatar(user.id, req.file.path);
    if (user.profile.avatar != "/public/uploads/default-avatar.jpg") {
      fm.deleteImage(user.profile.avatar);
    }
    return res.json(newProfile);
  } catch (err) {
    console.log(err);
    fm.deleteImage(req.file.path);
    return res.json("An error occured, please try again");
  }
};
