const { Router } = require("express");
const controller = require("../controllers/post");

const router = Router();

router
  .route("/:postid")
  .get(controller.getPost)
  .put(controller.updatePost)
  .delete(controller.deletePost);

router.get("/all", controller.all);
router.post("/new", controller.createPost);
router.get("/by/:userid", controller.userPosts);
router.put("/update/:postid", controller.updatePost);
router.get("/explore", controller.explorePage);
router.get("/popular", controller.popularPosts);

module.exports = router;
