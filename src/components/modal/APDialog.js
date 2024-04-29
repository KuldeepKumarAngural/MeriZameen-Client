import { Box, Dialog } from '@mui/material';
import React from 'react';
export const APDialog = ({ open, close, content, sx }) => {
  return (
    <Dialog keepMounted className="test-class" maxWidth={'500'} open={open} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <Box style={{ ...sx }}> {content}</Box>
    </Dialog>
  );
};
