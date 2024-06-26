// @flow

import * as React from 'react';

import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
const APModal = (props) => {
  const handleClose = () => setOpen(false);

  const { open, setOpen, className, children, title, subtitle, disableClose, style } = props;

  const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  return (
    <StyledModal 
      open={open} 
      closeAfterTransition 
      autoSave={true} 
      onClose={handleClose} 
      aria-labelledby="modal-title" 
      aria-describedby="modal-description"
      Backdrop={false} 
      keepMounted={true}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
    >
      <div style={{ maxHeight: '450px', overflow: 'auto', backgroundColor: '#ffff', padding: '20px', borderRadius: '8px', scrollbarWidth: 'none', scrollbarColor: 'rgb(103, 214, 107)' }}>{children}</div>
    </StyledModal>
  );
};

export default APModal;
