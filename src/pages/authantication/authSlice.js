import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgotPassword, loginUser, logoutUser, sendEmailForotp, signUpUser, verify } from './authApi';
import { createSession, invalidateSession } from '../../configuration/session';
import { SESSION_KEYS } from '../../constants/constant';

const initialState = {
  authData: { isAuthenticated: false },
  signUpLoading:false,
  loginLoading:false,
  otpLoading:false,
  forgotPasswordLoading:false,
  userData:localStorage.getItem(SESSION_KEYS.USER),
  status: 'done',
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginUser(credentials);
  return response;
});

export const signUp = createAsyncThunk('auth/signUp', async (credentials) => {
  const response = await signUpUser(credentials);
  return response;
});

export const verifyOtp = createAsyncThunk('auth/signUp', async (credentials) => {
  const response = await verify(credentials);
  return response;
});


export const sentOtprequest = createAsyncThunk('auth/sentOtprequest', async (credentials) => {
  const response = await sendEmailForotp(credentials);
  return response;
});

export const changePassword = createAsyncThunk('auth/ChangePassword', async (credentials) => {
  const response = await forgotPassword(credentials);
  return response;
});



export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await logoutUser();
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSession: (state) => {
      state.authData = { isAuthenticated: false };
      invalidateSession();
      window.location.href = window.location.origin + process.env.REACT_APP_BASE_NAME + '/';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'processing';
        state.signUpLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'done';
        state.signUpLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.loginLoading = true
        state.status = 'processing';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'done';
        state.loginLoading = false
        state.authData = action.payload;
        if (action?.payload?.userData) {
          const decodedData = atob(action?.payload?.userData);
          const [userId, name, email, mobile, roles] = decodedData.split(":");
          const user = {
            _id: userId,
            name: name,
            email: email,
            mobile: mobile,
            roles: roles,
          };
          localStorage.setItem(SESSION_KEYS.USER,JSON.stringify(user));
          state.userData = user;
          createSession(action?.payload?.accessToken);
        }
      })
      .addCase(logout.fulfilled , (state,action)=>{
        state.authData = { isAuthenticated: false };
        invalidateSession();
      })
      .addCase(sentOtprequest.pending, (state) => {
        state.otpLoading = true
      })
      .addCase(sentOtprequest.fulfilled, (state, action) => {
        state.otpLoading = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.forgotPasswordLoading = true
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
      });
  },
});
export const { logoutSession } = authSlice.actions;

export const selectAuthData = (state) => state.auth.authData;
export const selectLoginLoading = (state) => state.auth.loginLoading;
export const selectSignUpLoading = (state) => state.auth.signUpLoading;
export const selectAuthStatus = (state) => state.auth.status;
export const selectUserData = (state) => state.auth.userData;
export const selectOtpLoading = (state) => state.auth.otpLoading;
export const selectForgotPasswordLoading = (state) => state.auth.forgotPasswordLoading;



export default authSlice.reducer;
