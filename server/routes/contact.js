const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { auth, admin } = require('../middleware/auth');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
});

// Get all contacts (admin only)
router.get('/', auth, admin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

module.exports = router;