const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ['system', 'interviewer', 'candidate'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const mockInterviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    analysis: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Analysis',
    },
    status: {
      type: String,
      enum: ['InProgress', 'Completed'],
      default: 'InProgress',
    },
    messages: [messageSchema],
    finalFeedback: {
      type: [String],
      default: [],
    },
    score: {
      type: Number,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

const MockInterview = mongoose.model('MockInterview', mockInterviewSchema);

module.exports = MockInterview;
