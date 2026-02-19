import { route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home/home.jsx"),
  route("/login", "routes/login/login.jsx"),
  route("/register", "routes/register/register.jsx"),
  route("/posts", "routes/posts/explore.jsx"),
];
