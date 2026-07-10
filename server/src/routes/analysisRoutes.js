const express = require('express');
const { scrapeJobUrl, analyzeGap } = require('../controllers/analysisController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/scrape', protect, scrapeJobUrl);
router.post('/gap', protect, analyzeGap);

module.exports = router;
