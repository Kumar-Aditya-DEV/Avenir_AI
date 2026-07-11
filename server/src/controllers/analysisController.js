const axios = require('axios');
const cheerio = require('cheerio');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');

// @desc    Scrape Job Description from a URL
// @route   POST /api/analysis/scrape
// @access  Private
const scrapeJobUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    res.status(400);
    throw new Error('Please provide a URL to scrape');
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove scripts, styles, and nav elements to clean up text
    $('script, style, nav, footer, header, noscript, iframe').remove();

    // Extract text from the body
    let text = $('body').text();

    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();

    res.json({ text });
  } catch (error) {
    res.status(500);
    throw new Error('Failed to scrape URL. It might be blocking automated requests.');
  }
};

// @desc    Analyze resume against job description using Local Llama 3.2
// @route   POST /api/analysis/gap
// @access  Private
const analyzeGap = async (req, res) => {
  const { resumeId, jobDescription, jobTitle, company } = req.body;

  if (!resumeId || !jobDescription) {
    res.status(400);
    throw new Error('Please provide both resumeId and jobDescription');
  }

  try {
    // 1. Fetch the user's parsed resume
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      res.status(404);
      throw new Error('Resume not found');
    }

    // Ensure this user owns the resume
    if (resume.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to access this resume');
    }

    const resumeText = resume.extractedText;

    // 2. Construct the Prompt for Llama 3.2
    const systemPrompt = `
You will receive:

1. A Job Description
2. A Resume

Your task is to analyze the Job Description first, extract role requirements, compare them against the Resume, calculate an ATS score, and return a valid JSON response.

====================================================
INPUT ANALYSIS RULES
====================================================

STEP 1:
Analyze ONLY the Job Description.

Extract:
- Job Title
- Company Name
- Required Skills
- Required Technologies
- Required Tools
- Required Qualifications
- Required Experience
- Important Keywords

Create a list called:

identifiedJobRequirements

IMPORTANT:
Do NOT look at the Resume while building this list.
If the Job Description is very short (e.g. just a title like 'Prompt Engineer'), you MUST infer the standard, industry-expected technical skills for that role.

====================================================

STEP 2:
Analyze the Resume.

Determine:
- Candidate Skills
- Technologies
- Experience
- Education
- Projects
- Certifications
- Links

====================================================
ATS SCORING MODEL (TOTAL = 100)
====================================================

1. Skills Match (35 Points)

Formula:

(Matched Skills / Required Skills) × 35

Matching Rules:

Exact Match:
React = React

Alias Match (80%):
NodeJS = Node.js
JS = JavaScript
Mongo DB = MongoDB
TS = TypeScript

Related Match (50%):
AWS EC2 → AWS
Express.js → REST API Development
OpenAI API → LLM Integration
TensorFlow → Machine Learning

Calculate a weighted score.

====================================================

2. Keyword Match (20 Points)

Extract important keywords from the Job Description.

Examples:

REST API
Microservices
CI/CD
Docker
Kubernetes
Agile
Prompt Engineering
Large Language Models

Formula:

(Matched Keywords / Total Keywords) × 20

====================================================

3. Experience Match (15 Points)

Extract required experience from Job Description.

Scoring:

Candidate >= Required
= 15

Candidate is 80%-99% of Required
= 12

Candidate is 60%-79% of Required
= 8

Candidate is below 60%
= 4

Special Rule:

If role is:

- Intern
- Fresher
- Graduate
- Entry-Level
- Junior

evaluate relative to junior-level expectations.

Do not heavily penalize missing years if projects strongly align with the role.

====================================================

4. Project Relevance (10 Points)

Compare technologies used in candidate projects against technologies required by the Job Description.

Formula:

(Matched Project Technologies / JD Technologies) × 10

Only count technologies relevant to the target role.

====================================================

5. Education Match (5 Points)

Examples:

Bachelor Required
Bachelor Present
= 5

Master Preferred
Bachelor Present
= 3

No relevant degree
= 0

====================================================

6. Resume Quality (15 Points)

Contact Information (3)

Name = 1
Email = 1
Phone = 1

Links (2)

LinkedIn
GitHub
Portfolio

Any professional links present = 2

Length (2)

1 Page = 2
2 Pages = 1
3+ Pages = 0

Sections Present (4)

Education = 1
Skills = 1
Projects = 1
Experience = 1

Action Verbs (2)

Examples:

Built
Developed
Designed
Created
Implemented
Optimized
Integrated
Engineered

10+ verbs = 2
5-9 verbs = 1
Else = 0

Formatting Quality (2)

Readable
Well Structured
ATS Friendly

Pass = 2

====================================================
MATCHING RULES
====================================================

matchedSkills:

Include ONLY skills that:

1. Exist in identifiedJobRequirements
AND
2. Are clearly present in the Resume

missingSkills:

Include ONLY skills that:

1. Exist in identifiedJobRequirements
AND
2. Are NOT present in the Resume

Never include a skill in both lists.

Calculate the final score by summing these 6 sections (Total = 100).

====================================================
OUTPUT FORMAT
====================================================

Output the response STRICTLY as a JSON object with the following schema:
{
  "identifiedJobRequirements": ["Skill1", "Skill2", "... (List all core technical skills required for this role BEFORE comparing to the resume)"],
  "skillMatchingAnalysis": "String (Briefly explain which required skills were found in the resume text and which were missing. Verify carefully!)",
  "atsScore": "<integer from 0 to 100>",
  "matchedSkills": ["Skill1", "Skill2", "... (Must be a strict subset of identifiedJobRequirements, proven by your analysis)"],
  "missingSkills": ["Skill3", "Skill4", "... (Must be a strict subset of identifiedJobRequirements, proven by your analysis)"],
  "feedback": "String (Short 2-3 sentence overall feedback explaining the score calculation.)",
  "extractedJobTitle": "String (Extract the job title from the JD. If none is found, infer one based on the description)",
  "extractedCompany": "String (Extract the company name from the JD if present, else output 'Unknown Company')"
}
Do not include any markdown formatting, backticks, or other text outside the JSON object. Just the raw JSON.

`;

    const userPrompt = `undefined