import { useState } from 'react';
import {
    Alert,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function TailoredBP({copyError, result, copiedIndex, handleCopy}) {
    return (
        <Stack spacing={1.5}>
            {copyError && <Alert severity="error">{copyError}</Alert>}
            {result.tailoredBullets?.map((bullet, index) => (
                <Paper
                    key={index}
                    variant="outlined"
                    sx={{
                        p: 2,
                        backgroundColor: 'rgba(7, 8, 15, 0.55)',
                        borderColor: 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        • {bullet}
                    </Typography>
                    <Tooltip title={copiedIndex === index ? 'Copied!' : 'Copy bullet point'}>
                        <IconButton
                            size="small"
                            aria-label="Copy bullet point"
                            onClick={() => handleCopy(bullet, index)}
                            sx={{ color: 'text.secondary', '&:hover': { color: '#c084fc' } }}
                        >
                            {copiedIndex === index ? (
                                <CheckIcon fontSize="small" color="success" />
                            ) : (
                                <ContentCopyIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                </Paper>
            ))}
        </Stack>
    );
}
export default TailoredBP;