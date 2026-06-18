const path = require("node:path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const { join } = require("node:path");
const cors = require("cors");
const db = require("../queries/messages");

const allConversations = new Map();

const findChat = async function (userId, recipientId) {
  const chat = await db.getChat(userId, recipientId);
};

const cleanChat = function (chat) {
  const messages = [];
  for (const message of chat.messages) {
    messages.push({
      message: { message: message.content, time: message.createdAt },
      user: message.sender,
    });
  }
  return messages;
};

const getChat = async function (userId, recipientId) {
  const chat = await db.getChat(userId, recipientId);
  if (chat) {
    return chat;
  } else {
    return await db.createChat(userId, recipientId);
  }
};

function removeObjectWithId(arr, id) {
  return arr.filter((obj) => obj.userId !== id);
}

module.exports = function chatServer(expressApp, origin) {
  const server = createServer(expressApp);
  const io = require("socket.io")(server, {
    cors: {
      origin: origin,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  const rooms = new Map();

  io.engine.use(cookieParser());
  io.engine.use((req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      passport.authenticate("jwt", { session: false })(req, res, next);
    } else {
      next();
    }
  });

  io.on("connection", async (socket) => {
    console.log("connection requested");
    const user = socket.handshake.auth.user;

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        socketId: id,
        userId: socket.handshake.auth.user.id,
        username: socket.handshake.auth.user.username,
      });
    }

    socket.broadcast.emit("users", users);
    socket.emit("users", users);

    socket.on("send_message", async (data) => {
      await db.createMessage(user.id, chat.id, data.message);
      socket.to(chat.id).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      const index = users.indexOf((x) => x.userId === socket.user.userId);
      users.splice(index, 1);
      socket.broadcast.emit("users", users);
    });

    // On starting chat, emit chat history between users...
    socket.on("start_chat", async (recipientId) => {
      const chat = await getChat(user.id, recipientId);
      const messages = cleanChat(chat);
      socket.emit("chat_history", messages);
    });
  });

  return server;
};
