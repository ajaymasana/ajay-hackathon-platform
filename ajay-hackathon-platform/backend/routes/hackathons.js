const express = require('express');
const router = express.Router();
const { getAll, getOne, getFeatured } = require('../controllers/hackathonController');

router.get('/', getAll);
router.get('/featured', getFeatured);
router.get('/:id', getOne);

module.exports = router;
