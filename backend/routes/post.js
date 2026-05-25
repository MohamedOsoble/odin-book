const { Router } = require("express");
const passport = require("passport");
const controller = require("../controllers/post");
const isUser = require("../middleware/user").isUser;
const auth = passport.authenticate("jwt", { session: false });

const router = Router();

router.get("/all", controller.all);
router.post("/create", controller.createPost);
router.get("/by/:userid", controller.userPosts);
router.put("/update/:postid", controller.updatePost);
router.get("/following", isUser, controller.postsByFollowing);
router.get("/popular", controller.popularPosts);
router.get("/recent", controller.recentPosts);
router.post("/post/:postid/comment", controller.createComment);
router.post("/post/:postid/reply", controller.createReply);

router
  .route("/post/:postid")
  .get(controller.getPost)
  .put(controller.updatePost)
  .delete(auth, controller.deletePostRequest);

router.get("/:postid/like", isUser, controller.likePost);

module.exports = router;
