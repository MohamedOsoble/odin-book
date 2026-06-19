const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("node:path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const { join } = require("node:path");
const origin = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

require("./lib/passport.js");

// Instantiate express app.
const app = express();
// Instantiate web socket.
const server = require("./lib/socket.js")(app, origin);

// Add cors and request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: origin,
    credentials: true,
    sameSite: "lax",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  }),
);

const PORT = 3000;

app.use("/user", routes.user);
app.use("/posts", routes.post);
app.use("/profile", routes.profile);
app.use("/messages", routes.messages);
app.use("/search", routes.search);
app.use("/public/uploads/:filename", (req, res, next) => {
  res.sendFile(__dirname + "/public/uploads/" + req.params.filename);
});

server.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
