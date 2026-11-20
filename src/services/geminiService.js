export async function analyzeMatch(jobDescription, cvText) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription, cvText }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || 'Analysis failed. Please try again.');
    if (data.type === 'InputValidationError') {
      error.name = 'InputValidationError';
    }
    throw error;
  }

  return data;
}