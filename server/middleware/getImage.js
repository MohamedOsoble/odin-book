const fs = require("fs");
const path = require("path");

module.exports.getAvatar = (req, res, next) => {
  const assetsDir = path.join(__dirname, "../public/uploads/");
  if (fs.existsSync(assetsDir + req.params.filename)) {
    return res.sendFile(assetsDir + req.params.filename);
  } else {
    return res.sendFile(assetsDir + "default-avatar.jpg");
  }
};
