const Internship = require('../models/Internship');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 12, search, type, skill } = req.query;
    const query = {};
    if (search) query.$or = [{ company: { $regex: search, $options: 'i' } }, { title: { $regex: search, $options: 'i' } }];
    if (type) query.type = type;
    if (skill) query.skills = { $in: [skill] };

    const total = await Internship.countDocuments(query);
    const internships = await Internship.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ success: true, total, page: Number(page), pages: Math.ceil(total / limit), internships });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
    res.json({ success: true, internship });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const internships = await Internship.find({ featured: true }).sort({ createdAt: -1 }).limit(6);
    res.json({ success: true, internships });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json({ success: true, internship });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
    res.json({ success: true, internship });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
    res.json({ success: true, message: 'Internship deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
