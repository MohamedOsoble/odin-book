const prisma = require("../lib/prisma").public;

exports.create = async (authorId, content, isPublished) => {
  const post = await prisma.post.create({
    data: {
      authorId: authorId,
      content: content,
      published: isPublished,
    },
  });
  return post;
};

exports.all = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
    },
  });
  return posts;
};

exports.getPost = async (postId) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      comments: true,
    },
  });
  return post;
};

exports.updatePost = async (postId, content, isPublished) => {
  const post = await prisma.post.update({
    select: {
      id: postId,
    },
    data: {
      content: content,
      published: isPublished,
    },
  });
  return post;
};

exports.deletePost = async (postId) => {
  const post = await prisma.post.delete({
    select: {
      id: postId,
    },
  });
  return post;
};

exports.postsByUser = async (userId) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
  return posts;
};

// returns 15 most popular posts, omitting createdAt within 72h since the app itself wont have a lot of posts...
exports.popular = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      // createdAt: ""
    },
    orderBy: {
      likes: "desc",
    },
    take: 15,
  });
  return posts;
};

exports.explore = async (userId) => {
  const posts = await prisma.post.findMany({
    where: {
      author: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },
  });
  return posts;
};

exports.recent = async () => {
  const currDate = Date.now();
  const post = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: new Date(currDate - 1000 * 60 * 60 * 72), // Within last 72 hours
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return post;
};
