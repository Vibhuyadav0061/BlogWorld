const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
// app.use(cors());

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log(err));

// cors for deployment
// const cors = require("cors");

app.use(cors({
  origin: "https://blog-world-8dse-46csw7fqs-vibhuyadav0061s-projects.vercel.app",
  credentials: true
}));
 

const uri = process.env.MONGODB_URI;

console.log(uri);

if (!uri) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

// Routes
const userRoutes = require('./Routes/userRoutes');
const blogRoutes = require('./Routes/blogRoutes');
const authRoutes = require('./Routes/authRoutes');


app.use('/api/users', userRoutes);  // Make sure it's the router, not an object
app.use('/api/blogs', blogRoutes); 
app.use('/api/auth', authRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
