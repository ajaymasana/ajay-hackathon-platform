const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  stipend: { type: String, required: true },
  location: { type: String, required: true },
  skills: [{ type: String, trim: true }],
  applyLink: { type: String, required: true },
  deadline: { type: Date, required: true },
  duration: { type: String, default: '' },
  type: { type: String, enum: ['remote', 'onsite', 'hybrid'], default: 'remote' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Internship', internshipSchema);
