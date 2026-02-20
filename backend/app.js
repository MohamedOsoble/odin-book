const express = require("express");
const cors = require("cors");
const routes = require("./routes");

// Instantiate express app.
const app = express();

// Add cors and request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
