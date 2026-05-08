exports.getFile = async (req, res, next) => {
  const fileName = req.params.filename;
  res.sendFile("public/uploads" + filename);
};
