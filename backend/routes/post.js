const { Router } = require("express");
const controller = require("../controllers/post");
const isUser = require("../middleware/user").isUser;

const router = Router();

router.get("/all", controller.all);
router.post("/new", controller.createPost);
router.get("/by/:userid", controller.userPosts);
router.put("/update/:postid", controller.updatePost);
router.get("/explore", isUser, controller.explorePage);
router.get("/popular", controller.popularPosts);
router.get("/recent", controller.recentPosts);

router
  .route("/:postid")
  .get(controller.getPost)
  .put(controller.updatePost)
  .delete(controller.deletePost);

module.exports = router;
