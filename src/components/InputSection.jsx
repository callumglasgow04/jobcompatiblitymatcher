import React from 'react';
import {
    TextField,
    Typography,
    Paper,
} from '@mui/material';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(7, 8, 15, 0.6)',
    borderRadius: '10px',
  },
};

function InputSection({inputTitle, desc, setDesc}) {
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1.5}>
                {inputTitle}
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={11}
                placeholder="Paste the job description here..."
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
                sx={inputSx}
            />
        </Paper>
    );
}

export default InputSection;