const { Router } = require("express");
const controller = require("../controllers/post");
const isUser = require("../middleware/user").isUser;

const router = Router();

router.get("/all", controller.all);
router.post("/create", controller.createPost);
router.get("/by/:userid", controller.userPosts);
router.put("/update/:postid", controller.updatePost);
router.get("/following", isUser, controller.postsByFollowing);
router.get("/popular", controller.popularPosts);
router.get("/recent", controller.recentPosts);

router
  .route("/post/:postid")
.get(controller.getPost)
  .put(controller.updatePost)
  .delete(controller.deletePost);

router.get("/:postid/like", isUser, controller.likePost);

module.exports = router;
