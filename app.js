const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());


app.use(cors({
  origin: "https://my-book-verse.vercel.app",
  credentials: true      
}));

app.use(session({
  secret: "mybookverse_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",    
    secure: true          
  }
}));


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// User and Book models (We'll create these next)
const User = require('./models/User');
const Book = require('./models/Book');

// Routes (We'll create these next)
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.get('/api',(req,res)=>{
  return res.json({ message: 'BookVerse API up' });
})
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
