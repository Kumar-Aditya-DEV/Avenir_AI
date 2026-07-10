const mongoose = require('mongoose');

const analysisSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Resume',
    },
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
    },
    atsScore: {
      type: Number,
      required: true,
    },
    matchedSkills: {
      type: [String],
      required: true,
      default: [],
    },
    missingSkills: {
      type: [String],
      required: true,
      default: [],
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;
