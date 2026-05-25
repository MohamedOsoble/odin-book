const prisma = require("../lib/prisma").public;

exports.create = async (authorId, content) => {
  const post = await prisma.post.create({
    data: {
      authorId: authorId,
      content: content,
    },
  });
  return post;
};

exports.all = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      comments: true,
      likedby: true,
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
      comments: { include: { author: { include: { profile: true } } } },
      likedby: true,
      author: { include: { profile: { include: { user: true } } } },
      _count: { select: { likedby: true } },
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
    where: {
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
    include: {
      author: true,
      likedby: true,
      _count: {
        select: {
          likedby: true,
        },
      },
    },
  });
  return posts;
};

// returns 15 most popular posts, omitting createdAt within 72h since the app itself wont have a lot of posts...
exports.popular = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: { include: { profile: { include: { user: true } } } },
      likedby: true,
      _count: {
        select: {
          likedby: true,
        },
      },
    },
  });
  return posts;
};

exports.postsByFollowing = async (userId) => {
  const posts = await prisma.post.findMany({
    include: {
      author: { include: { profile: { include: { user: true } } } },
      likedby: true,
      _count: {
        select: {
          likedby: true,
        },
      },
    },
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
    include: {
      author: { include: { profile: { include: { user: true } } } },
      _count: {
        select: {
          likedby: true,
        },
      },
    },
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

exports.likePost = async (userId, postId) => {
  const isConnected = await prisma.post.findFirst({
    where: { id: postId, likedby: { some: { id: userId } } },
  });

  if (isConnected != null) {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedby: { disconnect: { id: userId } },
      },
      include: {
        _count: {
          select: {
            likedby: true,
          },
        },
      },
    });
    return updatedPost;
  } else {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedby: { connect: { id: userId } },
      },
      include: {
        _count: {
          select: {
            likedby: true,
          },
        },
      },
    });
    return updatedPost;
  }
};
