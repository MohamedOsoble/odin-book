import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  route("/", "routes/posts/posts.jsx", [
    index("routes/posts/popular.jsx"),
    route("/posts/following", "routes/posts/following.jsx"),
    route("/posts/recent", "routes/posts/recent.jsx"),
  ]),
  route("/post/:postId", "routes/posts/viewpost.jsx"),
  route("/login", "routes/login/login.jsx"),
  route("/logout", "routes/login/logout.jsx"),
  route("/register", "routes/register/register.jsx"),
  route("/profile/:username", "routes/profile/profile.jsx"),
  route("/messages", "routes/messages/messages.jsx"),
];
