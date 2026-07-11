const express = require('express');
const { scrapeJobUrl, analyzeGap, getAnalysis, deleteAnalysis } = require('../controllers/analysisController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/scrape', protect, scrapeJobUrl);
router.post('/gap', protect, analyzeGap);
router.get('/:id', protect, getAnalysis);
router.delete('/:id', protect, deleteAnalysis);

module.exports = router;
