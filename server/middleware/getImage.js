const fs = require("fs");
const path = require("path");

module.exports.getAvatar = (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "../public/uploads/",
    req.params.filename,
  );
  console.log(filePath);
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    return res.sendFile(
      path.join(__dirname, "../public/uploads/default-avatar.jpg"),
    );
  }
};
