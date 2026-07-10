const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const resumeRoutes = require('./resumeRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/resumes', resumeRoutes);

module.exports = router;
