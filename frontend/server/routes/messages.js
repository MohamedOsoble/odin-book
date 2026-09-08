const { Router } = require("express");
const passport = require("passport");
const controller = require("../controllers/messages");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth.required, controller.home);
router.get(
  "/conversations/:conversationId",
  auth.required,
  controller.getConversation,
);

module.exports = router;
