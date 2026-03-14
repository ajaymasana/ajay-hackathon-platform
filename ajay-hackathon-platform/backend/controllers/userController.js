const User = require('../models/User');
const Hackathon = require('../models/Hackathon');
const Internship = require('../models/Internship');

exports.saveOpportunity = async (req, res) => {
  try {
    const { opportunityId, opportunityType } = req.body;
    const user = await User.findById(req.user.id);

    const alreadySaved = user.savedOpportunities.find(
      (o) => o.opportunityId.toString() === opportunityId && o.opportunityType === opportunityType
    );
    if (alreadySaved)
      return res.status(400).json({ success: false, message: 'Already saved' });

    user.savedOpportunities.push({ opportunityId, opportunityType });
    await user.save();
    res.json({ success: true, message: 'Opportunity saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.unsaveOpportunity = async (req, res) => {
  try {
    const { opportunityId } = req.params;
    const user = await User.findById(req.user.id);
    user.savedOpportunities = user.savedOpportunities.filter(
      (o) => o.opportunityId.toString() !== opportunityId
    );
    await user.save();
    res.json({ success: true, message: 'Opportunity removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSaved = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const hackathonIds = user.savedOpportunities
      .filter((o) => o.opportunityType === 'Hackathon')
      .map((o) => o.opportunityId);
    const internshipIds = user.savedOpportunities
      .filter((o) => o.opportunityType === 'Internship')
      .map((o) => o.opportunityId);

    const [hackathons, internships] = await Promise.all([
      Hackathon.find({ _id: { $in: hackathonIds } }),
      Internship.find({ _id: { $in: internshipIds } }),
    ]);

    res.json({ success: true, hackathons, internships });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
