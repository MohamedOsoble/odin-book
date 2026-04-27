const db = require("../queries/post");
const validate = require("../validators/post");

// Dont think this will be needed
exports.all = async (req, res, next) => {
  const posts = await db.all();
  return res.json(posts);
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postid;
  const post = await db.getPost(postId);
  return res.json(post);
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postid;
  const { content, isPublished } = req.body;
  const post = await db.updatePost(postId, content, isPublished);
  return res.json(post);
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postid;
  const post = await db.deletePost(postId);
  return res.json(post);
};

exports.createPost = [
  validate.newPost,
  async (req, res, next) => {
    const post = await db.create(req.body.userId, req.body.content);
    if (post) {
      return res.status(200).json({
        message: "Success",
        post: post,
      });
    } else {
      return res.status(401).json({
        message: "Failure, post not created...",
      });
    }
  },
];

exports.userPosts = async (req, res, next) => {
  const userId = req.params.userid;
  const posts = await db.postsByUser(userId);
  return res.json(posts);
};

exports.popularPosts = async (req, res, next) => {
  const posts = await db.popular();
  return res.json(posts);
};

exports.postsByFollowing = async (req, res, next) => {
  const posts = await db.postsByFollowing(req.user);
  return res.json(posts);
};

exports.explorePage = async (req, res, next) => {
  const posts = await db.popular();
  console.log(posts);
  return res.json(posts);
};

exports.recentPosts = async (req, res, next) => {
  const posts = await db.recent();
  return res.json(posts);
};

exports.likePost = async (req, res, next) => {
  const userId = req.user;
  console.log(userId);
  const postId = req.params.postid;
  console.log(postId);
  if (userId && postId) {
    const post = await db.likePost(userId, postId);
    return res.json(post);
  } else {
    return res.json({ error: "Invalid post ID or user not logged in" });
  }
};
