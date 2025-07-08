import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export default function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}