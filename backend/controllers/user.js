const { prisma } = require('../lib/prisma');

module.exports.login = (req, res) => {
  return res.json('Login route');
};

module.exports.logout = (req, res) => {
  return res.json('Logout route');
};

module.exports.isLoggedIn = (req, res) => {
  return res.json('Is logged in route');
};