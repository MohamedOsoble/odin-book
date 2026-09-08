const { Router } = require("express");
const controller = require("../controllers/search");
const router = Router();

router.get("/users/:username", controller.findUser);
router.get("/posts/:postTerm", controller.findPost);

module.exports = router;
