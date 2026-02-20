const express = require("express");
const app = express();
const routes = require("./routes");

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = 3000;

app.use("/user", routes.user);
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
