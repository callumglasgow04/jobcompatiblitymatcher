import React from 'react';
import {
    Box,
    Button,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function AnalyseButton({ onClick, disabled, loading }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 2 }}>
            <Button
                variant="contained"
                size="large"
                startIcon={<AutoAwesomeIcon />}
                disabled={disabled}
                onClick={onClick}
                sx={{
                    borderRadius: '999px',
                    px: 5,
                    py: 1.5,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #9333ea, #4f46e5)',
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #7e22ce, #4338ca)',
                        boxShadow: '0 0 28px rgba(168, 85, 247, 0.65)',
                    },
                }}
            >
                {loading ? 'Analysing...' : 'Analyse Match'}
            </Button>
        </Box>
    );
}

export default AnalyseButton;