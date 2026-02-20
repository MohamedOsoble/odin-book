const { Router } = require('express');
const controller = require('../controllers/user');
// const passport = require("passport");
// const auth = passport.authenticate("jwt", { session: false });

const router = Router();

// Login route
router.get('/login', (req, res) => {
  return res.json('This is a post only route');
});

router.post('/login', controller.login);

// Logout route
router.get('/logout', (req, res) => {
  return res.json('This is a post only route');
});

router.post('/logout', controller.logout);

// Is logged in route
router.get('/isLoggedIn', controller.isLoggedIn);

module.exports = { router };