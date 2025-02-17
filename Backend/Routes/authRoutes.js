const express = require('express');
const jwt = require('jsonwebtoken');
// const User = require('../Model/User');
// const bcrypt = require('bcryptjs');
const router = express.Router();


// login authentication 

router.get('/profile', (req, res) => {

    // res.send("working perfect");
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
  
      return res.status(200).json({ message: 'Access granted', user: decoded });
    });
  });

module.exports = router;
  