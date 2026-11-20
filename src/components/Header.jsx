import React from 'react';
import {
    Box,
    Typography,
} from '@mui/material';

function Header() {
    return (
        <Box sx={{ width: '100%', textAlign: 'center', mb: 5 }}>
            <Typography
                variant="h3"
                component="h1"
                fontWeight={700}
                gutterBottom
                sx={{
                    background: 'linear-gradient(to right, #fff, #c084fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                AI CV & Job Matcher
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Paste a job description and your CV to see how well you match.
            </Typography>
        </Box>
    );
}

export default Header;