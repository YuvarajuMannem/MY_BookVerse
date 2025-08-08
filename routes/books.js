const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Middleware to check if user is logged in
function isAuth(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Add a Book
router.post('/add', isAuth, async (req, res) => {
  const { title, imageUrl, readUrl } = req.body;
  const book = new Book({
    userId: req.session.userId,
    title,
    imageUrl,
    readUrl,
  });
  await book.save();
  res.json({ message: 'Book added', book });
});

// Get all Books
router.get('/', async (req, res) => {
  const books = await Book.find().populate('userId', 'username');
  res.json(books);
});

module.exports = router;
