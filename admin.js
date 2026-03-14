const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  create: createHackathon,
  update: updateHackathon,
  remove: removeHackathon,
} = require('../controllers/hackathonController');
const {
  create: createInternship,
  update: updateInternship,
  remove: removeInternship,
} = require('../controllers/internshipController');

router.use(protect, adminOnly);

// Hackathons
router.post('/hackathons', createHackathon);
router.put('/hackathons/:id', updateHackathon);
router.delete('/hackathons/:id', removeHackathon);

// Internships
router.post('/internships', createInternship);
router.put('/internships/:id', updateInternship);
router.delete('/internships/:id', removeInternship);

module.exports = router;
