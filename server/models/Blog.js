const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String, required: true },
  tags: [{ type: String }],
  featuredImage: { type: String },
  author: { name: String, avatar: String },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  readingTime: { type: Number, default: 5 },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);