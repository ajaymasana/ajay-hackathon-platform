const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  organizer: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  prize: { type: String, required: true },
  mode: { type: String, enum: ['online', 'offline', 'hybrid'], default: 'online' },
  tags: [{ type: String, trim: true }],
  registrationLink: { type: String, required: true },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
