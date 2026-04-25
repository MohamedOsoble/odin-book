import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home/home.jsx"),
  route("/login", "routes/login/login.jsx"),
  route("/logout", "routes/login/logout.jsx"),
  route("/register", "routes/register/register.jsx"),
  route("/posts", "routes/posts/explore.jsx"),
  route("/profile/:username", "routes/profile/profile.jsx"),
];
