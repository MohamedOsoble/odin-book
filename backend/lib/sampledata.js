const faker = require("@faker-js/faker").faker;
const prisma = require("./prisma").public;
const axios = require("axios");

function createUserData() {
  const username = String(faker.internet.username()).replace(
    /[^A-Za-z0-9]/g,
    "",
  );
  const email = faker.internet.email();
  const password = faker.string.alphanumeric(12);
  const passwordConfirmation = password;
  return { username, email, password, passwordConfirmation };
}

function createPostData() {
  const content = faker.lorem.paragraphs({ min: 1, max: 3 }, " ");
  const isPublished = faker.datatype.boolean({ probability: 0.8 });
  return { content, isPublished };
}

async function registerUser(user) {
  const response = await axios.post(
    "http://localhost:3000/user/register",
    user,
  );
  return response;
}

async function populateUsers(n) {
  for (let i = 0; i < n; i++) {
    const user = createUserData();
    await registerUser(user);
  }
}

async function allUsers() {
  const users = await prisma.user.findMany({});
  return users;
}

async function getRandomAuthor() {
  const users = await allUsers();
  return users[Math.floor(Math.random() * users.length)];
}

async function populatePost(n) {
  for (let i = 0; i < n; i++) {
    const post = createPostData();
    const author = await getRandomAuthor();
    await prisma.post.create({
      data: {
        content: post.content,
        authorId: author.id,
        published: post.isPublished,
      },
    });
  }
  const allPosts = await prisma.post.findMany({});
  return allPosts;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany({});
  console.log(posts);
  return posts;
}

async function createProfiles() {
  const users = await allUsers();
  for (const user of users) {
    await prisma.profile.create({
      data: {
        bio: "Theres nothing here yet",
        userId: user.id,
        name: user.username,
      },
    });
  }
}

export default async function populateDatabase() {
  await populateUsers(15);
  await createProfiles();
  await createPosts(35);
}
