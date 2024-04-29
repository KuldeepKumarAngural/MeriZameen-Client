import { Grid, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import Building from '../../ui/json/building.json';
import { SignInForm } from './AuthForm';
import APSpinner from '../../components/spinner/APSpinner';
import { selectForgotPasswordLoading, selectLoginLoading, selectOtpLoading, selectSignUpLoading } from './authSlice';
import { useSelector } from 'react-redux';

const Auth = ({ updatePageTitle }) => {
  const loginLoading = useSelector(selectLoginLoading);
  const signUpLoading = useSelector(selectSignUpLoading);
  const otpLoading = useSelector(selectOtpLoading);
  const forgotPasswordLoading = useSelector(selectForgotPasswordLoading);

  useEffect(() => {
    updatePageTitle('Merizameen Auth');
  }, []);

  return (
    <>
    <APSpinner spinnerState={loginLoading || signUpLoading || forgotPasswordLoading || otpLoading }/>

    <Grid container gap={2} component="main" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} columns={12} justifyContent={'center'} alignItems="center">
      <Grid item sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} md={6}>
        <Typography padding={2} fontWeight={'600'} letterSpacing={'1px'}>
          <Lottie loop={false} animationData={Building} style={{ height: '300px' }} />
          <span style={{ fontWeight: '900' }}>Welcome</span> to <span style={{ color: '#4d87fa' }}>merizameen.com.</span> We have been serving the needs of the real estate industry in India since 2024. Our single platform is designed to meet the needs of buyers, sellers and brokers of India properties. Our success is attributed to our understanding of the needs of our customers and consistently working to meet those needs utilizing innovative e-commerce solutions. If you are interested in purchasing a home or locate a rental property, you'r in perfect place , you can search India properties
          using our portal to find the right residential property or commercial property to fit your needs. Search India properties in our enormous database by the type of property, just register with us and enter details and images of your property to get started..
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <SignInForm />
      </Grid>
    </Grid>
    </>
  );
};

export default Auth;
