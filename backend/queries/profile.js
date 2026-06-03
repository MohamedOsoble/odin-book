const prisma = require("../lib/prisma").public;

exports.getProfile = async (userId) => {
  const profile = await prisma.profile.findFirst({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          followers: {
            include: {
              follower: {
                include: { profile: true },
              },
            },
          },
          following: {
            include: {
              following: {
                include: { profile: true },
              },
            },
          },
          comments: { include: { author: { include: { profile: true } } } },
          profile: true,
          postsLiked: {
            include: {
              author: true,
              likedby: true,
              _count: { select: { likedby: true } },
            },
          },
          postsCreated: {
            include: {
              author: true,
              likedby: true,
              _count: { select: { likedby: true } },
            },
          },
        },
      },
    },
  });

  return { profile };
};

exports.updateProfile = async (profile) => {
  const updatedProfile = await prisma.profile.update({
    where: { profileId: profile.profileId },
    data: {
      name: profile.name,
      bio: profile.bio,
      dob: new Date(profile.dob),
      avatar: profile.avatar,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          followers: {
            include: {
              follower: {
                include: { profile: true },
              },
            },
          },
          following: {
            include: {
              following: {
                include: { profile: true },
              },
            },
          },
          comments: { include: { author: { include: { profile: true } } } },
          profile: true,
          postsLiked: {
            include: {
              author: true,
              likedby: true,
              _count: { select: { likedby: true } },
            },
          },
          postsCreated: {
            include: {
              author: true,
              likedby: true,
              _count: { select: { likedby: true } },
            },
          },
        },
      },
    },
  });
  return updatedProfile;
};

exports.updateAvatar = async (userId, avatarUrl) => {
  const updatedProfile = await prisma.profile.update({
    where: {
      userId: userId,
    },
    data: {
      avatar: avatarUrl,
    },
  });
  return updatedProfile;
};

exports.getAvatar = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: userId },
  });
  return profile;
};

exports.follow = async (followerId, followingId) => {
  const follow = await prisma.follows.create({
    data: {
      followerId: followerId,
      followingId: followingId,
    },
  });
  return follow;
};

exports.unfollow = async (followerId, followingId) => {
  const unfollow = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: followerId,
        followingId: followingId,
      },
    },
  });
  return unfollow;
};
