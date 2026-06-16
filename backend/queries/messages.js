const { user } = require("../routes");

const prisma = require("../lib/prisma").public;

exports.getFriends = async (userId) => {
  const mutuals = await prisma.follows.findMany({
    where: {
      followerId: {
        in: await prisma.follows
          .findMany({
            where: { followingId: userId },
            select: { followerId: true },
          })
          .then((follows) => follows.map((f) => f.followerId)),
      },
      followingId: userId,
    },
    include: {
      follower: {
        include: {
          profile: true,
        },
      }, // Includes the mutual user's data
    },
  });
  return mutuals;
};

exports.getConversations = async (userId) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  });
  return conversations;
};

exports.conversationsHome = async (userId) => {
  const conversations = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      followers: {
        where: {
          follower: {
            followers: {
              some: {
                followerId: userId,
              },
            },
          },
        },
        include: {
          follower: {
            include: {
              profile: true,
              conversations: {
                where: { users: { some: { id: { in: [userId] } } } },
              },
            },
          },
        },
      },
      conversations: {
        include: {
          users: { include: { profile: true } },
          messages: {
            include: {
              sender: true,
            },
          },
        },
      },
    },
  });
  return conversations;
};

exports.createChat = async (userId, recipientId, msg) => {
  console.log(msg);
  const chat = await prisma.conversation.create({
    data: {
      users: {
        connect: [
          {
            id: userId,
          },
          {
            id: recipientId,
          },
        ],
      },
    },
  });
  return chat;
};

exports.getChat = async (userId, recipientId) => {
  const chat = await prisma.conversation.findFirst({
    where: {
      AND: [
        // 1. Ensure both users are in the conversation
        { users: { some: { id: userId } } },
        { users: { some: { id: recipientId } } },
        // 2. Ensure NO OTHER users are in the conversation
        { users: { every: { id: { in: [userId, recipientId] } } } },
      ],
    },
    include: {
      users: true,
      messages: {
        include: { sender: { include: { profile: true } } },
      },
    },
  });
  return chat;
};

exports.createMessage = async (senderId, conversationId, msg) => {
  const message = await prisma.message.create({
    data: {
      senderId: senderId,
      conversationId: conversationId,
      content: msg,
    },
  });
  return message;
};
