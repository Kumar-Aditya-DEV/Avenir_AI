const express = require('express');
const { registerLocal, googleAuth } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerLocal);
router.post('/google', googleAuth);

module.exports = router;
