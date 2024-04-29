import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import APToaster from '../../components/Toaster/APToaster';
import { LinkButton } from '../../components/buttons/LinkButton';
import { APDialog } from '../../components/modal/APDialog';
import CompanyLogo from '../../ui/logos/newLogo.png';
import FaceBookImage from '../../ui/png/facebook.png';
import GoogleImage from '../../ui/png/google.png';
import { changePassword, login, selectForgotPasswordLoading, selectLoginLoading, selectOtpLoading, selectSignUpLoading, sentOtprequest, signUp, verifyOtp } from './authSlice';
import { addDelay } from '../../utils/utility';
import APSpinner from '../../components/spinner/APSpinner';

export const SignInForm = ({ route }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [credentials, setCredentials] = useState({});
  const [forgotPasswordData, setForgotPasswordData] = useState({});

  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState({
    id: '',
  });

  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const toastRef = useRef();
  const otpVerificationModal = useRef();

  const loginLoading = useSelector(selectLoginLoading);
  const signUpLoading = useSelector(selectSignUpLoading);
  const otpLoading = useSelector(selectOtpLoading);
  const forgotPasswordLoading = useSelector(selectForgotPasswordLoading);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = (e, name) => {
    e.preventDefault();
    if (name === 'login') {
      dispatch(login({ email: credentials.email, password: credentials.password })).then((resp) => {
        if (resp?.payload?.message) {
          route && naviGate(route);
        } else {
          toastRef.current.showToast({ messageType: 'warning', messageText: resp?.payload?.error?.response?.data?.message });
        }
      });
    } else {
      dispatch(signUp({ name: credentials?.name, mobile: credentials?.mobile, email: credentials?.email, password: credentials?.password })).then((resp) => {
        console.log(resp);
        if (resp.payload.status === 200) {
          setOtp({ id: resp.payload.id });
          setIsOpen(true);
        }
      });
    }
  };

  const otpSubmission = (event) => {
    event.preventDefault();
    console.log(otp);
    if (otp) {
      dispatch(verifyOtp(otp)).then((resp) => {
        console.log(resp);
        if (resp.payload.status === 200) {
          setIsOpen(false);
          setIsSigninForm(true);
        }
      });
    }
  };

  const handleOtpChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    setOtp({ ...otp, [name]: value });
  };


  const handleChangeForgotPassword = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForgotPasswordData({...forgotPasswordData,[name]:value});
  }


  const sendOtp = () => {
    if (forgotPasswordData?.email) {
        dispatch(sentOtprequest(forgotPasswordData.email)).then((resp)=>{
          toastRef.current.showToast({ messageType: 'warning', messageText: resp?.payload?.message});
          if (resp.payload.status===200) {
            setForgotPasswordData({id:resp.payload.id});
            addDelay(2000).then(()=>{
              setIsEmailSent(true);
              
            })
          }
        })
    }
  };

  const submitForgotpasswordRequest = () => {
    console.log(forgotPasswordData);
    if (forgotPasswordData?.otp && forgotPasswordData.confirmPassword && forgotPasswordData?.password) {
        dispatch(changePassword({otp:forgotPasswordData?.otp,password:forgotPasswordData.password, id:forgotPasswordData?.id})).then((resp)=>{
          toastRef.current.showToast({ messageType: 'warning', messageText: resp?.payload?.message});
          addDelay(2000).then(()=>{
            setIsOpenForgotPassword(false);
            setIsEmailSent(false);
          })
        })
    }
   
  };

  return (
    <Grid>
      <APToaster ref={toastRef} title="" />
      <CardContent sx={{ textAlign: 'center' }}>
        <img src={CompanyLogo} loading="lazy" height={'80px'} />
      </CardContent>
      {isSigninForm && (
        <Card sx={{ mt: '20px' }}>
          <CardContent>
            <Typography fontWeight={'600'} sx={{ textAlign: 'center' }}>
              Welcome back! Please authorize to begin the journey.
            </Typography>
            <Box component="form" noValidate mt={3} onSubmit={() => {}}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                <Input
                  autoComplete="email"
                  autoFocus
                  required
                  name="email"
                  type="email"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 5 }}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input fullWidth name="password" required onChange={handleChange} type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
              </FormControl>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button type="submit" onClick={(e) => onSubmit(e, 'login')} variant="contained" sx={{ mt: 3, mb: 2, width: '200px' }}>
                  {loginLoading === true ? 'loading' : 'sign in'}
                </Button>
              </Grid>
              <Divider> or continue using </Divider>
              <Grid container gap={4} textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button>
                  <Avatar src={GoogleImage} />
                </Button>
                <Button>
                  <Avatar src={FaceBookImage} />
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <LinkButton
                    style={{ fontWeight: '600' }}
                    onClick={() => {
                      setIsOpenForgotPassword(true);
                    }}
                    text={'Forgot password?'}
                  />
                </Grid>
                <Grid item>
                  <LinkButton style={{ fontWeight: '600' }} onClick={() => setIsSigninForm(false)} text={"Don't have an account? Sign Up"} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}

      {!isSigninForm && (
        <Card sx={{ mt: '20px' }}>
          <CardContent>
            <Typography fontWeight={'600'}> Welcome to Merizameen. - to begin create Account Please enter your details.</Typography>
            <Box component="form" noValidate mt={3} onSubmit={() => {}}>
              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                <Input name="name" onChange={handleChange} autoComplete="name" autoFocus required type="text" />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                <Input name="email" onChange={handleChange} autoComplete="email" required type="email" />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Mobile</InputLabel>
                <Input
                  autoComplete="mobile"
                  name="mobile"
                  id="standard-adornment-password"
                  type="number"
                  onChange={handleChange}
                  inputProps={{
                    style: { '-moz-appearance': 'textfield' },
                    'aria-hidden': true,
                  }}
                />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input name="password" onChange={handleChange} fullWidth required type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
              </FormControl>

              <FormControlLabel control={<Checkbox value="termsAndConditions" color="primary" />} label="I agree to the Terms and conditions " />
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button type="submit" onClick={(e) => onSubmit(e, 'signup')} variant="contained" sx={{ mt: 3, mb: 2, width: '200px' }}>
                  Sign Up
                </Button>
              </Grid>
              <Divider> or sign-Up using </Divider>
              <Grid container gap={4} textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button>
                  <Avatar src={GoogleImage} />
                </Button>
                <Button>
                  <Avatar src={FaceBookImage} />
                </Button>
              </Grid>
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Grid md={6} item>
                  <LinkButton onClick={() => setIsSigninForm(true)} style={{ fontWeight: '600' }} text={'Already  have an account? Sign in'} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Otp Verification */}

      <APDialog
        open={isOpen}
        close={() => setIsOpen(false)}
        content={
          <>
            <Box sx={{ padding: 2 }}>
              <Typography textAlign={'center'}>Verify your email</Typography>
              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">enter your otp</InputLabel>
                <Input
                  autoComplete="otp"
                  name="otp"
                  id="standard-adornment-password"
                  type="number"
                  onChange={handleOtpChange}
                  inputProps={{
                    style: { '-moz-appearance': 'textfield' },
                    'aria-hidden': true,
                  }}
                />
              </FormControl>
              <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Button variant="outlined" onClick={otpSubmission}>
                  Submit
                </Button>
              </Box>
            </Box>
          </>
        }
      />

      {/* Forgot PAssword */}

      <APDialog
        open={isOpenForgotPassword}
        close={() => setIsOpenForgotPassword(false)}
        content={
          <>
            <Box sx={{ padding: 2 }}>
              <Typography textAlign={'center'}>Forgot Password</Typography>
              {isEmailSent && (
                <>
                  <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                    <InputLabel htmlFor="standard-adornment-password">Otp</InputLabel>
                    <Input
                      autoComplete="otp"
                      name="otp"
                      id="standard-adornment-password"
                      type="number"
                      onChange={handleChangeForgotPassword}
                      inputProps={{
                        style: { '-moz-appearance': 'textfield' },
                        'aria-hidden': true,
                      }}
                    />
                  </FormControl>
                  <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>

                    <Input name="password" onChange={handleChangeForgotPassword} fullWidth required type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
                  </FormControl>
                  <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>

                    <Input name="confirmPassword" onChange={handleChangeForgotPassword} fullWidth required type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
                  </FormControl>
                </>
              )}

              {!isEmailSent && (
                <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                  <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                  <Input
                    autoComplete="email"
                    name="email"
                    id="standard-adornment-password"
                    type="email"
                    onChange={handleChangeForgotPassword}
                    inputProps={{
                      style: { '-moz-appearance': 'textfield' },
                      'aria-hidden': true,
                    }}
                  />
                </FormControl>
              )}

              <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Button variant="outlined" onClick={!isEmailSent ? ()=>sendOtp() :() =>submitForgotpasswordRequest()}>
                  {!isEmailSent ? 'send email' : 'Change Password'}
                </Button>
              </Box>
            </Box>
          </>
        }
      />
    </Grid>
  );
};
