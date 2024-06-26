import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import 'react-chatbot-kit/build/main.css';
import { APRoutes } from '../constants/routes';
import { googleLogin, selectUserData } from '../pages/authantication/authSlice';
import { theme } from '../theme/theme';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUserData);

  useEffect(()=>{
    !isLoggedIn && dispatch(googleLogin()).then((resp)=>{
      console.log(resp);
    })    
  },[])
  
  return (
    <div className="app" style={{ height: '100%', width: '100%' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <APRoutes />
      </ThemeProvider>
    </div>
  );
};
