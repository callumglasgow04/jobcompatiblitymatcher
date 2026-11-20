import 'dotenv/config';
import express from 'express';
import { analyzeMatch } from './geminiService.mjs';

const app = express();

app.use(express.json({ limit: '128kb' }));

app.post('/api/analyze', async (req, res) => {
  const { jobDescription, cvText } = req.body ?? {};

  if (
    typeof jobDescription !== 'string' ||
    typeof cvText !== 'string' ||
    !jobDescription.trim() ||
    !cvText.trim()
  ) {
    return res.status(400).json({
      error: 'Please provide both a job description and a CV.',
      type: 'InputValidationError',
    });
  }

  try {
    const result = await analyzeMatch(jobDescription, cvText);
    res.json(result);
  } catch (error) {
    if (error.name === 'InputValidationError') {
      return res.status(400).json({
        error: error.message,
        type: 'InputValidationError',
      });
    }

    console.error('Analysis failed:', error);
    res.status(500).json({
      error: 'We couldn’t analyse this right now. Please try again.',
    });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));