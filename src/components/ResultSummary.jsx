import { useEffect, useRef, useState } from 'react';
import {
    Box,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';

import TailoredBP from './resultsComp/TailoredBP';
import MissingKeyWords from './resultsComp/missingKeyWords';
import ProgressBarScore from './resultsComp/ProgressBarScore';

function getScoreColor(score) {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#a855f7';
    return '#ef4444';
}

function ResultSummary({ result, loading, error }) {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [copyError, setCopyError] = useState('');
    const copyTimeout = useRef(null);

    useEffect(() => {
        setCopiedIndex(null);
        setCopyError('');
        return () => clearTimeout(copyTimeout.current);
    }, [result]);

    const handleCopy = async (text, index) => {
        clearTimeout(copyTimeout.current);
        setCopiedIndex(null);
        setCopyError('');

        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            copyTimeout.current = setTimeout(() => setCopiedIndex(null), 2000);
        } catch {
            setCopyError('Could not copy the bullet point. Please copy it manually.');
        }
    };

    return (
        <Paper sx={{ p: 4, minHeight: 160 }}>
            {!loading && (
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Match Summary
                </Typography>
            )}

            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        py: 4,
                        gap: 2,
                    }}
                >
                    <CircularProgress color="primary" />
                    <Typography variant="body2" color="text.secondary">
                        Analysing your CV against the job description...
                    </Typography>
                </Box>
            )}

            {!loading && !error && !result && (
                <Typography variant="body2" color="text.secondary">
                    Your match score, missing keywords, and tailored bullet points will appear here.
                </Typography>
            )}

            {!loading && !error && result && (
                <Stack spacing={3.5} sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ position: 'relative', width: 84, height: 84, flexShrink: 0 }}>
                            <ProgressBarScore getScoreColor={getScoreColor} result={result} />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h6" fontWeight={700}>
                                    {result.matchScore}%
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                                Overall Match Score
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {result.matchScore >= 75
                                    ? 'Strong match. Review the suggestions below to refine your CV.'
                                    : 'Review the suggestions below to better highlight your relevant experience.'}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                    <MissingKeyWords result={result} />

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                            Tailored CV Bullet Points
                        </Typography>
                        <TailoredBP
                            copyError={copyError}
                            result={result}
                            copiedIndex={copiedIndex}
                            handleCopy={handleCopy}
                        />
                    </Box>
                </Stack>
            )}
        </Paper>
    );
}
export default ResultSummary;