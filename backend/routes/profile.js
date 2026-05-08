const { Router } = require("express");
const controller = require("../controllers/profile");
const isUser = require("../middleware/user").isUser;
const path = require("path");
const multer = require("multer");
const router = Router();

// Currently storing on disk, consider changing to cloud storage later...
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("avatar");

router.get("/:username", controller.getProfile);
router.post("/:username/update", controller.update);
router.post("/:username/avatar", upload, controller.newAvatar);

module.exports = router;
