const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { auth, admin } = require('../middleware/auth');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { status: 'published' };
    if (category) query.category = category;

    const blogs = await Blog.find(query).select('-content').sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
});

// Get single blog post
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    blog.views += 1;
    await blog.save();

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
});

// Create blog (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({
      success: true,
      message: 'Blog created',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
});

module.exports = router;