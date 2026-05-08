const prisma = require("../lib/prisma").public;

exports.getProfile = async (userId) => {
  const profile = await prisma.profile.findFirst({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          followers: true,
          following: true,
          comments: true,
          profile: true,
          postsCreated: {
            include: { author: true, _count: { select: { likedby: true } } },
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
          username: true,
          email: true,
          followers: true,
          following: true,
          comments: true,
          profile: true,
          postsCreated: {
            include: { author: true, _count: { select: { likedby: true } } },
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
