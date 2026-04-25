const { Router } = require("express");
const controller = require("../controllers/profile");
const isUser = require("../middleware/user").isUser;

const router = Router();

router.get("/:username", controller.getProfile);
router.post("/:username/update", controller.update);

module.exports = router;
