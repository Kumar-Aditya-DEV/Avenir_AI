const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const resumeRoutes = require('./resumeRoutes');
const analysisRoutes = require('./analysisRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/resumes', resumeRoutes);
router.use('/analysis', analysisRoutes);

module.exports = router;
