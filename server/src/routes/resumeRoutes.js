const express = require('express');
const { uploadResume, getMyResumes } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getMyResumes);

module.exports = router;
