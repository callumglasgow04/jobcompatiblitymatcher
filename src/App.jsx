import { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Grid,
  Alert
} from '@mui/material';

import Header from './components/Header';
import ResultSummary from './components/ResultSummary';
import AnalyseButton from './components/AnalyseButton';
import InputSection from './components/InputSection';
import {analyzeMatch } from './services/geminiService';

const cosmicTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a855f7' },
    background: {
      default: '#07080f',
      paper: 'rgba(18, 21, 36, 0.65)',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#07080f',
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(88, 28, 135, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 80% 80%, rgba(30, 58, 138, 0.25) 0%, transparent 45%)
          `,
          minHeight: '100vh',
          overflowX: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        },
      },
    },
  },
});

// export const MOCK_RESULT = {
//   matchScore: 72,
//   missingKeywords: [
//     'AI Agents',
//     'Power BI',
//     'Data Analytics',
//     'Data Quality',
//     'Automation',
//   ],
//   tailoredBullets: [
//     'Analyzed and filtered operational student performance data using Python, Django, and SQL backend APIs to deliver structured reporting insights for educators.',
//     'Engineered data management and validation processes using SQL, MySQL, and Oracle databases to maintain high data integrity across full-stack applications.',
//     'Maintained accurate internal delivery tracking records and data workflows using spreadsheets, ensuring data quality and operational consistency.',
//   ],
// };


function App() {
  const [jobDesc, setJobDesc] = useState('');
  const [cvText, setCvText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await analyzeMatch(jobDesc, cvText);
      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        err.name === 'InputValidationError'
          ? err.message
          : 'We couldn’t analyze this right now. Please try again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <ThemeProvider theme={cosmicTheme}>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Header />

        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputSection inputTitle={"Job Description"} desc={jobDesc} setDesc={setJobDesc} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <InputSection inputTitle={"CV"} desc={cvText} setDesc={setCvText} />
          </Grid>
        </Grid>

        <AnalyseButton onClick={handleAnalyze} disabled={!jobDesc.trim() || !cvText.trim()} loading={loading} />

        {result && (
          <ResultSummary result={result} loading={loading} error={error} />
        )}
        {!loading && error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
      </Container>
    </ThemeProvider>
  );
}
export default App;