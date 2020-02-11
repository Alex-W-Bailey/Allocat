const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


// Login
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
  }), (req, res) => {
    console.log('logged in');
  });

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;