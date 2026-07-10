# Avenir — AI Resume Gap Analyzer & Mock Interview Coach

Upload your resume and a job description, discover your skill gaps, generate a personalized preparation roadmap, and practice with AI-powered mock interviews tailored to your target role.

---

## Who Is This For?

Avenir helps students and job seekers prepare for specific roles by generating personalized skill-gap analysis and targeted interview practice, instead of generic interview content that may not match their desired position.

---

## Overview

Every job seeker faces the same challenge: they have a resume, they find a job posting, and they don't know exactly how far apart the two are—or what to study before the interview.

Avenir closes that gap automatically.

Users can upload a resume and provide a job description, receive a detailed gap analysis, generate a personalized preparation roadmap, and practice with AI-powered mock interviews tailored to the skills they are missing.

The entire pipeline runs on local AI models through Ollama, enabling fully offline AI inference without relying on paid cloud APIs. Built using the MERN stack, Avenir provides personalized interview preparation while keeping user data private and under the user's control.

---

## Key Features

### Resume & Job Description Analysis
- Upload resumes in PDF format
- Paste job descriptions directly
- Provide job posting URLs with manual text fallback support
- Extract and analyze structured information

### Intelligent Gap Analysis
- Identify missing skills and technologies
- Detect experience gaps
- Highlight role-specific requirements
- Prioritize gaps by importance

### Personalized Preparation Plan
- Generate role-focused study roadmaps
- Prioritized learning recommendations
- Downloadable PDF preparation reports
- Actionable improvement suggestions

### AI-Powered Mock Interviews
- Skill-specific interview sessions
- Dynamic follow-up questions
- Real-time answer evaluation
- Personalized feedback and improvement suggestions
- Interview performance summaries

### Privacy & Reliability
- Runs completely on local AI models
- No paid API dependency
- Offline-capable architecture
- User data remains on the user's machine
- No fabricated skills or experience recommendations

---

## Architecture

```text
┌─────────────────────────────────────────────┐
│                React Frontend               │
│           React + Vite + Tailwind           │
└───────────────────┬─────────────────────────┘
                    │ HTTP
                    ▼
┌─────────────────────────────────────────────┐
│             Express Backend                 │
│ Resume Parsing • Gap Analysis • Interviews  │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│                  Ollama                     │
│                Llama 3.2                    │
└───────────────────┬─────────────────────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      MongoDB        Whisper (Optional)
```

### Application Flow

```text
Resume Upload
      │
      ▼
Resume Parsing
      │
      ▼
Job Description Analysis
      │
      ▼
Gap Identification
      │
      ▼
Prep Plan Generation
      │
      ▼
Mock Interview
      │
      ▼
Feedback & Improvement Report
```

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Multer
- PDF-Parse
- PDFKit
- Axios
- Cheerio

### AI & NLP
- Ollama
- Llama 3.2
- Whisper (Optional)

### Database
- MongoDB
- Mongoose

---

## Project Structure

```text
avenir/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
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
│   │   │   └── interviewService.js
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
├── README.md
└── package.json
```

---

## Prerequisites

Before running the project locally, ensure the following are installed:

- Node.js 18+
- MongoDB
- Ollama
- Git

### Recommended Hardware

- 8 GB RAM minimum
- 16 GB RAM recommended
- 5 GB free disk space

---

## Ollama Setup

Install Ollama:

https://ollama.com

Download the default model:

```bash
ollama pull llama3.2
```

Verify installation:

```bash
ollama list
```

Expected output:

```bash
NAME              ID              SIZE
llama3.2:latest   xxxxxxxxxxxx    2.0 GB
```

The backend communicates with Ollama via:

```text
http://localhost:11434
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd avenir
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server directory:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/avenir

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2

JWT_SECRET=your_secret_key
```

---

## Running the Application

### Start MongoDB

```bash
mongod
```

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## API Endpoints

### Resume Processing

```http
POST /api/resume/upload
```

Upload and extract resume content.

---

### Job Description Analysis

```http
POST /api/job/analyze
```

Analyze job descriptions and identify requirements.

---

### Gap Analysis

```http
POST /api/gap/analyze
```

Generate personalized skill-gap reports.

---

### Preparation Plan

```http
POST /api/prep/generate
```

Generate study roadmap and recommendations.

---

### Mock Interview

```http
POST /api/interview/start
POST /api/interview/respond
POST /api/interview/end
```

Conduct AI-powered interview sessions.

---

## Sample Workflow

1. Upload Resume (PDF)
2. Paste Job Description or Job URL
3. AI extracts and analyzes content
4. Gap analysis identifies missing skills
5. Personalized preparation roadmap generated
6. User selects a skill to practice
7. AI conducts a mock interview
8. AI provides targeted feedback
9. Performance summary generated

---

## Design Principles

### No Fabricated Experience

The system never invents skills, projects, certifications, or experience not present in the user's resume.

### Transparent AI Feedback

All interview feedback and recommendations are clearly labeled as AI-generated guidance.

### Graceful Failure Handling

If job posting URLs cannot be parsed, users can directly paste the job description.

### Offline First

Avenir is designed to work using local models through Ollama without requiring paid AI APIs.

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

## Future Enhancements

- Multiple interview skill tracks
- Voice-based interviews
- ATS compatibility scoring
- Learning resource recommendations
- Interview analytics dashboard
- Progress tracking
- Resume optimization suggestions
- Multi-model support (Qwen, Mistral, Phi)

---

## License

This project is licensed under the MIT License.

---

## Team

### Resume & JD Parsing
Responsible for PDF extraction and job description processing.

### Gap Analysis & Prep Plan
Responsible for skill-gap identification and roadmap generation.

### Mock Interview Agent
Responsible for interview flow, feedback generation, and evaluation.

### Application & AI Integration
Responsible for MERN architecture, Ollama integration, database management, and deployment.