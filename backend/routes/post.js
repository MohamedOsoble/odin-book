const { Router } = require("express");
const passport = require("passport");
const controller = require("../controllers/post");
const auth = require("../middleware/auth");

const router = Router();

router.get("/all", controller.all);
router.post("/create", controller.createPost);
router.get("/by/:userid", controller.userPosts);
router.put("/update/:postid", controller.updatePost);
router.get("/following", auth.required, controller.postsByFollowing);
router.get("/popular", controller.popularPosts);
router.get("/recent", controller.recentPosts);
router.post("/post/:postid/comment", controller.createComment);
router.post("/post/:postid/reply", controller.createReply);

router
  .route("/post/:postid")
  .get(controller.getPost)
  .put(controller.updatePost)
  .delete(auth.required, controller.deletePostRequest);

router
  .route("/comment/delete/:commentId")
  .delete(auth.required, controller.deleteCommentRequest);

router.get("/:postid/like", auth.required, controller.likePost);

module.exports = router;
