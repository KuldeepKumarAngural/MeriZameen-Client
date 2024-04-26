import { Alert, Snackbar } from '@mui/material';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const APToaster = forwardRef(({ title, x, y, type }, ref) => {
  const [open, setOpen] = useState(false);
  const [messageData, setmessageData] = useState({});

  useImperativeHandle(
    ref,
    () => ({
      showToast: (props) => {
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
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={messageData?.position ? { ...messageData?.position } : { vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={messageData.messageType || 'success'} variant="filled" sx={{ width: '400px', boxShadow: 3, borderRadius: '30px' }}>
          {messageData?.messageText || ''}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default APToaster;
