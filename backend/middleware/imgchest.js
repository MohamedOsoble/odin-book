require("dotenv").config();
const axios = require("axios");
const token = process.env.IMGCHEST_TOKEN;

exports.uploadImage = async (req, res, next) => {
  console.log(token);
  const data = {
    title: "",
    privacy: "secret",
    anonymous: true,
    nsfw: false,
    images: req.file.buffer,
  };
  const response = await axios
    .post("https://api.imgchest.com/v1/post", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(function (err) {
      return err;
    });
  console.log(response);
  req.uploadData = response.data;
  next();
};
