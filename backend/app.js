const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./lib/passport");

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
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
