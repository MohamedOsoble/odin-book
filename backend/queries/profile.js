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
      dob: profile.dob,
      avatar: profile.avatar,
    },
  });
  return updatedProfile;
};
