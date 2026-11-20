import React from 'react';
import {
    Box,
    Chip,
    Typography,
} from '@mui/material';

function MissingKeyWords({ result }) {
    return (
        <Box>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                Missing Keywords
            </Typography>
            {result.missingKeywords?.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {result.missingKeywords.map((keyword, index) => (
                        <Chip
                            key={index}
                            label={keyword}
                            sx={{
                                backgroundColor: 'rgba(168, 85, 247, 0.15)',
                                border: '1px solid rgba(168, 85, 247, 0.45)',
                                color: '#e9d5ff',
                                fontWeight: 500,
                            }}
                        />
                    ))}
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    No major missing keywords found.
                </Typography>
            )}
        </Box>
    );
}
export default MissingKeyWords;