import React from 'react';
import { CircularProgress } from '@mui/material';

function ProgressBarScore({ getScoreColor, result }) {
    return (
        <>
            <CircularProgress
                variant="determinate"
                value={100}
                size={84}
                thickness={5}
                sx={{ color: 'rgba(255, 255, 255, 0.08)' }}
            />
            <CircularProgress
                variant="determinate"
                value={result.matchScore}
                size={84}
                thickness={5}
                sx={{
                    color: getScoreColor(result.matchScore),
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    strokeLinecap: 'round',
                }}
            />
        </>
    );
}

export default ProgressBarScore;