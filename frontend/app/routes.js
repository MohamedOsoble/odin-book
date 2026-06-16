import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  route("/", "routes/posts/Posts.jsx", [
    index("routes/posts/Posts.jsx", { id: "home" }),
    route("/posts/:route", "routes/posts/Posts.jsx", { id: "other-posts" }),
  ]),
  route("/post/:postId", "routes/posts/Viewpost.jsx"),
  route("/login", "routes/login/Login.jsx"),
  route("/logout", "routes/login/Logout.jsx"),
  route("/register", "routes/register/Register.jsx"),
  route("/profile/:username", "routes/profile/Profile.jsx"),
  route("/messages", "routes/messages/Messages.jsx"),
  route("/search/:username", "routes/search/Results.jsx"),
];
