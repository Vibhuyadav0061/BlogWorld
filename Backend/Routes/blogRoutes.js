const express = require('express');
const Blog = require('../Model/Blog');
const User = require('../Model/User');
// const jwt = require('jsonwebtoken');
const router = express.Router();

// // Middleware to verify JWT token
// const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// Create a new blog
router.post('/', async (req, res) => {
  const { title, content ,username } = req.body;

  try {
    const blog = new Blog({ title, content, username});
    await blog.save();

    res.status(201).json({ message: 'Blog created', blog });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all blogs
router.get('/:username', async (req, res) => {
  
  try {
    const {username }= req.params;
    console.log(username);
    const blogs = await Blog.find({username});
    
    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found' });  // Handle case where no blogs exist
    }
    
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  
  try {
    
    
    const blogs = await Blog.find();
    
    if (!blogs.length) {
      return res.status(404).json({ message: 'No blogs found' });  // Handle case where no blogs exist
    }
    
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
