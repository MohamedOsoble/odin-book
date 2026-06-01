const dbProfile = require("../queries/profile");
const dbUser = require("../queries/user");
const validate = require("../validators/post");
const fm = require("../lib/fileManagement");

const findUser = async (username) => {
  const user = await dbUser.getUser(username);
  return user;
};

exports.getProfile = async (req, res, next) => {
  console.log("Getting Profile");
  const user = await findUser(req.params.username);
  const profileData = await dbProfile.getProfile(user.id);
  return res.status(200).json(profileData);
};

exports.update = async (req, res, next) => {
  const user = await findUser(req.params.username);
  if (user.id === req.user.id) {
    try {
      const profile = await dbProfile.updateProfile(req.body);
      return res.status(200).json(profile);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res
      .status(401)
      .json({ msg: "You are not authorized to amend this profile" });
  }
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

exports.follow = async (req, res, next) => {
  const followedUser = await findUser(req.params.username);
  if (req.user.following.some((item) => item.followingId === followedUser.id)) {
    return res.status(400).json("You already follow this user");
  } else {
    const request = await dbProfile.follow(req.user.id, followedUser.id);
    return res.json(request);
  }
};

exports.unfollow = async (req, res, next) => {
  const followedUser = await findUser(req.params.username);
  if (
    !req.user.following.some((item) => item.followingId === followedUser.id)
  ) {
    return res.status(400).json("You don't follow this user");
  } else {
    const request = await dbProfile.unfollow(req.user.id, followedUser.id);
    return res.json(request);
  }
};
