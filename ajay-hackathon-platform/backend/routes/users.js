const express = require('express');
const router = express.Router();
const { saveOpportunity, unsaveOpportunity, getSaved } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/saved', getSaved);
router.post('/save', saveOpportunity);
router.delete('/save/:opportunityId', unsaveOpportunity);

module.exports = router;
