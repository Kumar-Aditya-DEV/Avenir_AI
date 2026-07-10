# Avenir AI — AI Resume Gap Analyzer & Mock Interview Coach

AI-powered Resume Gap Analyzer & Mock Interview Coach that helps students and job seekers identify skill gaps, generate personalized preparation plans, and practice targeted interviews for specific roles.

---

## Who Is This For?

Avenir helps students and job seekers prepare for specific roles by generating personalized skill-gap analysis and targeted interview practice, instead of generic interview content that may not match their desired position.

---

## Overview

Preparing for interviews often involves navigating generic resources that may not align with a candidate's target role.

Avenir solves this problem by comparing a user's resume against a job description, identifying missing skills and experience, generating a personalized preparation roadmap, and conducting AI-powered mock interviews tailored to those gaps.

The platform uses local AI models through Ollama, ensuring privacy, offline capability, and no dependency on paid AI APIs.

---

## Features

### Authentication & Account Management
- Email & Password Authentication
- Google OAuth Login
- Email Verification
- Password Recovery & Reset
- Secure Session Management

### Dashboard
- ATS Score Overview
- Resume Status Tracking
- Recent Analyses
- Interview Progress
- Quick Actions

### Resume Management
- PDF Resume Upload
- Resume Preview
- Resume Suggestions
- Resume Version History

### Job Description Analysis
- Paste Job Description
- Upload Job Description
- Job URL Processing
- Keyword Extraction
- Skill Requirement Detection

### AI Gap Analysis
- ATS Compatibility Score
- Skill Match Evaluation
- Missing Skills Detection
- Missing Experience Analysis
- Strength & Weakness Identification

### Personalized Preparation Plans
- Priority-Based Learning Roadmaps
- Topic Recommendations
- Estimated Study Time
- Downloadable PDF Reports

### AI Mock Interviews
- Domain-Based Interviews
- Difficulty Selection
- Voice & Text Modes
- Dynamic Follow-Up Questions
- AI Feedback & Evaluation

### History Tracking
- Previous Gap Reports
- Interview Sessions
- Preparation Plans
- Resume Versions

### Profile & Settings
- Profile Management
- Skills Overview
- Privacy Controls
- Dark Mode Support
- Account Preferences

### Downloads
- Gap Analysis Reports
- Preparation Plans
- Interview Summaries
- Resume Exports

---

## Public Pages

- Landing Page
- About
- Contact
- Privacy Policy
- Terms & Conditions

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- PDF-Parse
- PDFKit
- Cheerio

### Database
- MongoDB
- Mongoose

### AI Layer
- Ollama
- Llama 3.2
- Whisper (Optional)

### Authentication
- JWT
- Google OAuth 2.0
- Email Verification

---

## Architecture

```text
┌──────────────────────────────────────────────┐
│               React Frontend                 │
│          React + Vite + Tailwind             │
└─────────────────┬────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────┐
│              Express Backend                 │
│ Authentication • Analysis • Interviews       │
└─────────────────┬────────────────────────────┘
                  │
      ┌───────────┼───────────┐
      ▼                       ▼
┌─────────────┐      ┌─────────────────┐
│  MongoDB    │      │     Ollama      │
│ Persistence │      │    Llama 3.2    │
└─────────────┘      └─────────────────┘
```

---

## System Workflow

```text
User Login
    ↓
Upload Resume
    ↓
Provide Job Description
    ↓
Resume & JD Parsing
    ↓
Gap Analysis
    ↓
ATS Score Generation
    ↓
Preparation Roadmap
    ↓
AI Mock Interview
    ↓
Feedback & Evaluation
    ↓
Progress Tracking
```

---

## Project Structure

```text
avenir/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── Landing/
│   │   │   ├── About/
│   │   │   ├── Contact/
│   │   │   ├── Login/
│   │   │   ├── Signup/
│   │   │   ├── Dashboard/
│   │   │   ├── Resume/
│   │   │   ├── JobDescription/
│   │   │   ├── Analysis/
│   │   │   ├── PrepPlan/
│   │   │   ├── Interview/
│   │   │   ├── History/
│   │   │   ├── Profile/
│   │   │   ├── Settings/
│   │   │   └── Downloads/
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── ollamaService.js
│   │   │   ├── resumeParser.js
│   │   │   ├── gapAnalyzer.js
│   │   │   ├── prepPlanGenerator.js
│   │   │   ├── interviewService.js
│   │   │   ├── atsScorer.js
│   │   │   └── pdfGenerator.js
│   │   │
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   ├── seed.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── docs/
├── LICENSE
├── README.md
└── package.json
```

---

## Ollama Setup

### Recommended Hardware
- 8 GB RAM minimum
- 16 GB RAM recommended
- 5 GB free disk space

Install Ollama:

https://ollama.com

Pull the default model:

```bash
ollama pull llama3.2
```

Verify installation:

```bash
ollama list
```

Expected Output:

```bash
llama3.2:latest
```

Default Endpoint:

```text
http://localhost:11434
```

---

## Environment Variables

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/avenir

JWT_SECRET=your_jwt_secret

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

EMAIL_SERVICE_KEY=
CLIENT_URL=http://localhost:5173
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd avenir
```

### Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

### Start Development Servers

Start Backend:

```bash
cd server
npm run dev
```

Start Frontend:

```bash
cd client
npm run dev
```

---

## Sample User Journey

1. Create an account or sign in
2. Upload a resume
3. Paste a job description or provide a job URL
4. Generate ATS and skill-gap analysis
5. Review strengths and missing skills
6. Generate a personalized preparation roadmap
7. Practice AI-powered mock interviews
8. Receive detailed interview feedback
9. Track progress through dashboard and history

---

## Demo Interview Flow

### Current Demonstration Skill

**Docker Fundamentals**

Demonstrates:
- Interview question generation
- Context-aware follow-up questions
- Response evaluation
- Personalized feedback
- Interview summary generation

The architecture supports extending this workflow to any identified gap skill.

---

## Privacy First

- Local AI inference through Ollama
- No paid AI API dependency
- User data remains under user control
- Offline-capable architecture
- Never invents skills, projects, certifications, or experience not present in the user's resume.

---

## Future Enhancements

- Voice-only interview mode
- Learning resource recommendations
- Advanced ATS optimization
- Multi-model support (Qwen, Mistral, Phi)
- Analytics Dashboard
- Team & Recruiter Mode

---

## License

Licensed under the MIT License.