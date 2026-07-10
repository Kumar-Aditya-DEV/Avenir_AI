const express = require('express');
const { registerLocal, loginLocal, googleAuth } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerLocal);
router.post('/login', loginLocal);
router.post('/google', googleAuth);

module.exports = router;
