import { Alert, Snackbar } from '@mui/material';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const APToaster = forwardRef(({ title, x, y, type }, ref) => {
  const [open, setOpen] = useState(false);
  const [messageData, setmessageData] = useState({});

  useImperativeHandle(
    ref,
    () => ({
<<<<<<< HEAD
      showToaster: (props) => {
        setOpen(true)
=======
      showToast: (props) => {
>>>>>>> a00ddcd325746f24a13812e45d1e02738d5ad9af
        setmessageData(props);
        setOpen(true);
      },
    }),
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
<<<<<<< HEAD
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={messageData?.position ? { ...messageData?.position } : { vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose}  severity={messageData.messageType} variant="filled" sx={{ width: '400px',boxShadow:3, borderRadius: '30px' }}>
          {messageData.message}
=======
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={messageData?.position ? { ...messageData?.position } : { vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={messageData.messageType || 'success'} variant="filled" sx={{ width: '400px', boxShadow: 3, borderRadius: '30px' }}>
          {messageData?.messageText || ''}
>>>>>>> a00ddcd325746f24a13812e45d1e02738d5ad9af
        </Alert>
      </Snackbar>
    </div>
  );
});

export default APToaster;
