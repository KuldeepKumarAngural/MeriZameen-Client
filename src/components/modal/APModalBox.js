import * as React from 'react';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const APModalBox = React.forwardRef((props, ref) => {

  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const { className, children, title, subtitle, disableClose, style } = props;

  React.useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setOpen(true);
      },
      close : ()=>{
        setOpen(false);
      }
    }),
    []
  );

  const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  return (
    <StyledModal open={open} closeAfterTransition autoSave={true} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box style={{ maxHeight: '100%', overflow: 'auto', backgroundColor: '#ffff', padding: '20px', borderRadius: '8px', scrollbarWidth: 'none', scrollbarColor: 'rgb(103, 214, 107)' }}>
        <Typography>{title||""}</Typography>
        {children}
      </Box>
    </StyledModal>
  );
});

export default APModalBox;
