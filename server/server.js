/* ========================================
   PORTFOLIO - EXPRESS SERVER
   ======================================== */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../client')));
app.use('/projects', express.static(path.join(__dirname, '../projects')));

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blog');

// Import error handler
const errorHandler = require('./middleware/errorHandler');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB error:', err.message));

// Serve main HTML for SPA (skip project demo pages)
app.get('*', (req, res) => {
  if (req.path.startsWith('/projects/')) {
    return res.status(404).send('Project not found');
  }
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving client from ../client`);
});

module.exports = app;