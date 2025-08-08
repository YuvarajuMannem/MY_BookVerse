const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  imageUrl: String,
  readUrl: String,
});

module.exports = mongoose.model('Book', BookSchema);
