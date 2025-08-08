const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    req.session.userId = user._id;
    res.json({ message: 'User created', username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'Username might already exist.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password} = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

  req.session.userId = user._id;
  res.json({ message: 'Logged in', username: user.username });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

module.exports = router;
