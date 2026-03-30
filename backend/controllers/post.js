const db = require("../queries/post");
const validate = require("../validators/post");

// Dont think this will be needed
exports.all = async (req, res, next) => {
  const posts = await db.all();
  console.log("All posts called successfully");
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
    const post = await db.create(req.authorId, req.content, req.isPublished);
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

exports.popularPosts = (req, res, next) => {
  return res.json("Return list of most popular posts");
};

exports.explorePage = (req, res, next) => {
  return res.json("Return list of posts specific to the user");
};

exports.recentPosts = (req, res, next) => {
  return res.json("Returns list of posts made in the last 72h");
};
