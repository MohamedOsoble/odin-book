const postDb = require("../queries/post");
const commentDb = require("../queries/comment");
const validate = require("../validators/post");

// Dont think this will be needed
exports.all = async (req, res, next) => {
  const posts = await postDb.all();
  return res.json(posts);
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postid;
  const post = await postDb.getPost(postId);
  return res.json(post);
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postid;
  const { content, isPublished } = req.body;
  const post = await postDb.updatePost(postId, content, isPublished);
  return res.json(post);
};

const deletePost = async (postId) => {
  const post = await postDb.deletePost(postId);
  return post;
};

exports.deletePostRequest = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postid;
  const post = await postDb.getPost(postId);
  if (post.author.id === userId) {
    try {
      const post = await deletePost(postId);
      return res.json(post);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  } else {
    return res.status(400).json({
      msg: "You are not authorized to delete this post",
    });
  }
};

exports.createPost = [
  validate.newPost,
  async (req, res, next) => {
    const post = await postDb.create(req.body.userId, req.body.content);
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
  const posts = await postDb.postsByUser(userId);
  return res.json(posts);
};

exports.popularPosts = async (req, res, next) => {
  const posts = await postDb.popular();
  return res.json(posts);
};

exports.postsByFollowing = async (req, res, next) => {
  const posts = await postDb.postsByFollowing(req.user.id);
  return res.json(posts);
};

exports.explorePage = async (req, res, next) => {
  const posts = await postDb.popular();
  console.log(posts);
  return res.json(posts);
};

exports.recentPosts = async (req, res, next) => {
  const posts = await postDb.recent();
  return res.json(posts);
};

exports.likePost = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.postid;

  // Shouldn't have to confirm here, should be validated before the query is called, not my responsibility
  if (userId && postId) {
    const post = await postDb.likePost(userId, postId);
    return res.json(post);
  } else {
    return res.json({ error: "Invalid post ID or user not logged in" });
  }
};

exports.createComment = async (req, res, next) => {
  const comment = await commentDb.createComment(req.body);
  return res.json(comment);
};

exports.createReply = async (req, res, next) => {
  const reply = await commentDb.createReply(req.body);
  return res.json(reply);
};
