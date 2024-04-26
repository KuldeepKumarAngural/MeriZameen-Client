import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import CompanyLogo from '../../ui/logos/newLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { LinkButton } from '../../components/buttons/LinkButton';
import FaceBookImage from '../../ui/png/facebook.png';
import GoogleImage from '../../ui/png/google.png';
import { Box as jBox } from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import { login, selectLoginLoading, selectSignUpLoading, signUp } from './authSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import APToaster from '../../components/Toaster/APToaster';

export const SignInForm = ({ route }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [credentials, setCredentials] = useState({});

  const dispatch = useDispatch();
  const naviGate = useNavigate();
  const toastRef = useRef();

  const loginLoading = useSelector(selectLoginLoading);
  const signUpLoading = useSelector(selectSignUpLoading);

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
        } else {toastRef.current.showToast({messageType: 'warning',messageText: resp?.payload?.error?.response?.data?.message})}
      });
    } else {
      dispatch(signUp({ name: credentials?.name, mobile: credentials?.mobile, email: credentials?.email, password: credentials?.password })).then((resp) => {
        console.log(resp);
      });
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
                  <LinkButton style={{ fontWeight: '600' }} text={'Forgot password?'} />
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
    </Grid>
  );
};
