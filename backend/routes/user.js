const { Router } = require("express");
const controller = require("../controllers/user");
const passport = require("passport");
const validator = require("../validators/user");
const { auth } = require("../controllers/auth");

const router = Router();

router.post("/login", controller.login);

router.get("/logout", controller.logout);

router.post("/register", controller.register);

router.get("/checkAuth", auth, controller.checkAuth);

module.exports = router;
