const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');


const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Please upload a PDF file');
    }

    const pdfData = await pdfParse(req.file.buffer);
    
    const extractedText = pdfData.text;

    const resume = await Resume.create({
      user: req.user._id,
      originalFileName: req.file.originalname,
      extractedText: extractedText,
    });

    res.status(201).json({
      message: 'Resume uploaded and parsed successfully',
      resumeId: resume._id,
      originalFileName: resume.originalFileName,
      extractedText: extractedText,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message || 'Error parsing the PDF');
  }
};

const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching resumes');
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or unauthorized' });
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error deleting resume', error: error.message });
  }
};

module.exports = {
  uploadResume,
  getMyResumes,
  deleteResume,
};
