const fs = require("fs").promises;

exports.deleteImage = async (path) => {
  try {
    await fs.rm(path);
    return `${path} has been removed`;
  } catch (err) {
    console.error("Error removing file:", err);
  }
};
