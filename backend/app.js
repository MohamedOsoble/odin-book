const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("node:path");

require("./lib/passport.js");

// Instantiate express app.
const app = express();

// Add cors and request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
    sameSite: "lax",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  }),
);

// temp home route
app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = 3000;

app.use("/user", routes.user);
app.use("/posts", routes.post);
app.use("/profile", routes.profile);
app.use("/public/uploads/:filename", (req, res, next) => {
  res.sendFile(__dirname + "/public/uploads/" + req.params.filename);
});
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});