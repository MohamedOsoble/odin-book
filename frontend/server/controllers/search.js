const userDb = require("../queries/user");
const postDb = require("../queries/post");

exports.findUser = async (req, res, next) => {
  const users = await userDb.search(req.params.username);
  return res.json(users);
};

exports.findPost = async (req, res, next) => {
  const posts = await postDb.findPost(req.params.postTerm);
  return res.json(posts);
};
