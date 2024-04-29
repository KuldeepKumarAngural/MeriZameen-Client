import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import '../../pages/Global.scss';
import { Box, Dialog } from '@mui/material';
const APSpinner = ({ spinnerState }) => {
  return spinnerState ? 
   
        <Box sx={{position:'absolute', display: 'flex' , marginTop: '50vh',marginLeft:'50vw' , zIndex:'999999999999999999',justifyContent:'center' , alignItems:'center' }}>
        <CircularProgress   size={50} />
      </Box>
:
    null
};

export default APSpinner;
