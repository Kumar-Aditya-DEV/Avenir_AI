const express = require('express');
const {
  startInterview,
  submitAnswer,
  endInterview,
  getInterview,
} = require('../controllers/interviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/start', protect, startInterview);
router.post('/:id/answer', protect, submitAnswer);
router.post('/:id/end', protect, endInterview);
router.get('/:id', protect, getInterview);

module.exports = router;
