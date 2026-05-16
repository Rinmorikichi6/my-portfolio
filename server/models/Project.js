const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['web', 'fullstack', 'frontend'], default: 'web' },
  technologies: [{ type: String }],
  images: [{ type: String }],
  thumbnail: { type: String },
  liveLink: { type: String },
  githubLink: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);