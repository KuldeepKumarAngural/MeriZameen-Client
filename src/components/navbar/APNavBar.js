import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { Badge, Card, CardContent, Chip, DialogActions, Divider, FormControl, Grid, Input, InputLabel, Link, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CompanyLogo from '../../ui/logos/newLogo.png';
import { GoogleMap } from '../../utils/utility';
import { APDialog } from '../modal/APDialog';
import '../../pages/Global.scss';
import { useNavigate } from 'react-router-dom';
import { APRoutes, ROUTES } from '../../constants/routes';
import { SESSION_KEYS, options, settings, userSettings } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserData } from '../../pages/authantication/authSlice';
import APModalBox from '../modal/APModalBox';
import Auth from '../../pages/authantication/Auth';
import { SignInForm } from '../../pages/authantication/AuthForm';

export const APNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openQueryPannel, setOpenQueryPannel] = React.useState(false);
  const [openCallBack, setOpenCallBack] = React.useState(false);
  const USER = useSelector(selectUserData);
  const naviGate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = React.useRef();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseFeedback = () => {
    setOpenQueryPannel(false);
  };

  const openQuery = () => {
    setOpenDialog(false);
    setOpenQueryPannel(true);
  };

  const isLoggedIn = () => {
    const USER = localStorage.getItem(SESSION_KEYS.USER);
    if (USER) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    isLoggedIn();
  }, [USER]);

  const openCallBackDailog = () => {
    setOpenDialog(false);
    setOpenCallBack(true);
  };

  const handleCloseCallBackDailog = () => {
    setOpenCallBack(false);
  };

  const handleSendCallBackRequest = () => {
    setOpenCallBack(false);
  };

  const handleSendFeedBack = () => {
    setOpenQueryPannel(false);
  };

  const handlePostPropertyEvent = React.useCallback(() => {
      isLoggedIn() ? naviGate('/postAd') : modalRef.current.open();
  },[USER]);

  const handleUserClick = (eventName) => {
    console.log(eventName);
    if (eventName==='Logout') {
      dispatch(logout()).then((resp)=>{
        naviGate('/');
      });
    }
    return handleCloseUserMenu();
  }

  return (
    <>
      <AppBar elevation={1} position="static" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <Link
                onClick={() => {
                  naviGate('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={CompanyLogo} loading="lazy" height={'60px'} />
              </Link>
            </Grid>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Buy</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Rent</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Agents</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Services</Typography>
                </MenuItem>
                <MenuItem onClick={handlePostPropertyEvent}>
                  <Typography textAlign="center">Post Property</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Grid sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <Link
                onClick={() => {
                  naviGate('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={CompanyLogo} loading="lazy" height={'60px'} />
              </Link>
            </Grid>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Chip className="nav-hover" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} label={'Buy'} variant="outlined" />
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Chip className="nav-hover" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} label={'Rent'} variant="outlined" />
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Chip className="nav-hover" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} label={'Agents'} variant="outlined" />
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Chip className="nav-hover" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} label={'Services'} variant="outlined" />
              </Button>

              <Tooltip title="Post Property">
                <Button onClick={handlePostPropertyEvent} variant="outlined" className="post-button" sx={{ my: 2, marginLeft: '130px', display: 'block', borderRadius: '30px' }}>
                  <Badge style={{ padding: 4, fontSize: '10px' }} variant="outlined" color="success">
                    Post Property
                  </Badge>
                </Button>
              </Tooltip>
            </Box>

            <Tooltip title="Contact us">
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
                variant="outlined"
                sx={{ my: 2, marginRight: '15px', display: 'block', borderRadius: '30px' }}
              >
                <InfoIcon style={{ fontSize: '20px', color: 'inherit' }} />
              </IconButton>
            </Tooltip>

            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn() ? (
                <Tooltip title="Profile settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={USER?.name} src={USER?.image||"/static/images/avatar/2.jpg"} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Signin / create account">
                  <IconButton sx={{ p: 0 }} onClick={()=>{!isLoggedIn() && naviGate('/auth')}} >
                    <AccountCircleIcon  style={{ fontSize: '40px', color: 'inherit' }} />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting} onClick={()=>  handleUserClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        {/* Contact Dialoug */}
        <APDialog
          open={openDialog}
          close={handleCloseDialog}
          content={
            <>
              <Card>
                <CardContent>
                  <Typography textAlign={'center'} fontWeight={'700'}>
                    Contact Us
                  </Typography>
                  <Typography>1st Floor, Manchanda Tower opposite Novelty Mall, Pathankot, Punjab, India </Typography>

                  <Typography>9:30AM to 6:00PM IST</Typography>

                  <Grid container gap={2}>
                    <Tooltip title="Call">
                      <Button variant="outlined" sx={{ fontSize: '10px' }} color="text" md={6} startIcon={<PhoneIcon style={{ paddingTop: '0px' }} />}>
                        9877726857
                      </Button>
                    </Tooltip>
                    <Tooltip title="Request a callBack">
                      <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={() => openCallBackDailog()} color="text" md={6} startIcon={<PhoneForwardedIcon style={{ paddingTop: '3px' }} />}>
                        Request a callBack
                      </Button>
                    </Tooltip>
                  </Grid>

                  <Divider sx={{ mt: 2 }}></Divider>
                  {GoogleMap()}
                  <Grid textAlign={'center'} mt={2}>
                    <Button variant="outlined" onClick={() => openQuery()} textAlign={'center'}>
                      click here to share your query
                    </Button>
                  </Grid>
                </CardContent>
                <DialogActions>
                  <Button fullWidth variant="outlined" onClick={handleCloseDialog}>
                    close
                  </Button>
                </DialogActions>
              </Card>
            </>
          }
        />

        {/* Contact Call-Back dialog */}
        <APDialog
          open={openCallBack}
          close={handleCloseCallBackDailog}
          content={
            <>
              <Card>
                <CardContent>
                  <Typography textAlign={'center'} fontWeight={'600'}>
                    Call Back Request
                  </Typography>
                  <Box component="form" noValidate mt={3} onSubmit={() => {}}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                      <Input autoComplete="name" required id="standard-adornment-password" type="text" />
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                      <Input autoComplete="email" required id="standard-adornment-password" type="email" />
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Mobile</InputLabel>
                      <Input autoComplete="mobile" required id="standard-adornment-password" type="Mobile" />
                    </FormControl>

                    <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                      <InputLabel htmlFor="standard-adornment-password"> </InputLabel>
                      <TextField id="outlined-select-currency" variant="standard" label="i am " select>
                        {options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Query</InputLabel>
                      <Input multiline rowsF={4} autoComplete="text" required id="standard-adornment-password" type="text" />
                    </FormControl>
                  </Box>
                </CardContent>

                <DialogActions>
                  <Button fullWidth variant="outlined" onClick={handleCloseCallBackDailog}>
                    close
                  </Button>

                  <Button fullWidth variant="outlined" onClick={handleSendCallBackRequest}>
                    Send
                  </Button>
                </DialogActions>
              </Card>
            </>
          }
        />

        {/* Feedback / query  Dialoug */}

        <APDialog
          open={openQueryPannel}
          close={handleCloseFeedback}
          content={
            <>
              <Card>
                <CardContent>
                  <Typography textAlign={'center'} fontWeight={'600'}>
                    Feedback Form
                  </Typography>
                  <Box component="form" noValidate mt={3} onSubmit={() => {}}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                      <Input autoComplete="name" autoFocus required id="standard-adornment-password" type="text" />
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                      <Input autoComplete="email" autoFocus required id="standard-adornment-password" type="email" />
                    </FormControl>

                    <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="standard-adornment-password">Enter your feedback</InputLabel>
                      <Input multiline rowsF={4} autoComplete="email" autoFocus required id="standard-adornment-password" type="email" />
                    </FormControl>
                  </Box>
                </CardContent>

                <DialogActions>
                  <Button fullWidth variant="outlined" onClick={handleCloseFeedback}>
                    close
                  </Button>
                  <Button fullWidth variant="outlined" onClick={handleSendFeedBack}>
                    Send
                  </Button>
                </DialogActions>
              </Card>
            </>
          }
        />

        <APModalBox ref={modalRef} >
          <SignInForm  route={'/postAd'} />
        </APModalBox>
      </AppBar>
    </>
  );
};
