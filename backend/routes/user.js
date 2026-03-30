const { Router } = require("express");
const controller = require("../controllers/user");
const { auth } = require("../controllers/auth");

const router = Router();

router.post("/login", controller.login);

router.get("/logout", controller.logout);

router.post("/register", controller.register);

router.get("/checkAuth", auth, controller.checkAuth);

router.get("/all", controller.all);

module.exports = router;
