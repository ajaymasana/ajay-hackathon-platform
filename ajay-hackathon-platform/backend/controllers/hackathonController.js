const Hackathon = require('../models/Hackathon');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, mode, tag } = req.query;
    const query = {};
    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }, { organizer: { $regex: search, $options: 'i' } }];
    if (mode) query.mode = mode;
    if (tag) query.tags = { $in: [tag] };

    const total = await Hackathon.countDocuments(query);
    const hackathons = await Hackathon.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), hackathons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ success: false, message: 'Hackathon not found' });
    res.json({ success: true, hackathon });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ featured: true }).sort({ createdAt: -1 }).limit(6);
    res.json({ success: true, hackathons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const hackathon = await Hackathon.create(req.body);
    res.status(201).json({ success: true, hackathon });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hackathon) return res.status(404).json({ success: false, message: 'Hackathon not found' });
    res.json({ success: true, hackathon });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
    if (!hackathon) return res.status(404).json({ success: false, message: 'Hackathon not found' });
    res.json({ success: true, message: 'Hackathon deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
