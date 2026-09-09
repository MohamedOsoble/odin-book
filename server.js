require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const routes = require("./server/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("node:path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const { join } = require("node:path");
const getImage = require("./server/middleware/getImage.js");
require("./server/lib/passport.js");

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "5173");

// Set origin paths
const origin = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
  "http://odinbook.mohzzy.com",
];
// Instantiate express app.
const app = express();
// Instantiate web socket.
const server = require("./server/lib/socket.js")(app, origin);

const logger = async (req, res, next) => {
  console.log(req.originalUrl);
  next();
};

app.use(compression());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("build/client", { maxAge: "1h" }));
// app.use(logger);
app.use("/api/user", routes.user);
app.use("/api/posts", routes.post);
app.use("/api/profile", routes.profile);
app.use("/api/messages", routes.messages);
app.use("/api/search", routes.search);
app.use("/api/public/uploads/:filename", getImage.getAvatar);

async function startServer() {
  if (DEVELOPMENT) {
    const vite = require("vite");
    const viteDevServer = await vite.createServer({
      server: { middlewareMode: true },
    });
    app.use(viteDevServer.middlewares);
    app.use(async (req, res, next) => {
      try {
        const source = await viteDevServer.ssrLoadModule("./server/app.js");
        return await source.app(req, res, next);
      } catch (error) {
        if (typeof error === "object" && error instanceof Error) {
          viteDevServer.ssrFixStacktrace(error);
        }
        next(error);
      }
    });
  } else {
    app.use(
      "/assets",
      express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
    );
    app.use(morgan("tiny"));
    app.use(express.static("build/client", { maxAge: "1h" }));
    const BUILD_FILE = require(BUILD_PATH);
    app.use(BUILD_FILE.app);
  }
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
