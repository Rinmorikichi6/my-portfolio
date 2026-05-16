const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, admin } = require('../middleware/auth');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = { status: 'published' };
    if (category) query.category = category;

    const projects = await Project.find(query).sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
});

// Get single project
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      status: 'published'
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.views += 1;
    await project.save();

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
});

// Create project (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({
      success: true,
      message: 'Project created',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
});

module.exports = router;