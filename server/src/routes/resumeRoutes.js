const express = require('express');
const { uploadResume, getMyResumes, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getMyResumes);
router.delete('/:id', protect, deleteResume);

module.exports = router;
