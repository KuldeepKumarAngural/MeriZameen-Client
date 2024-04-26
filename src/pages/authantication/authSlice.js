import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signUpUser } from './authApi';
import { createSession, invalidateSession } from '../../configuration/session';
import { SESSION_KEYS } from '../../constants/constant';

const initialState = {
  authData: { isAuthenticated: false },
  signUpLoading:false,
  loginLoading:false,
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
      });
  },
});
export const { logoutSession } = authSlice.actions;

export const selectAuthData = (state) => state.auth.authData;
export const selectLoginLoading = (state) => state.auth.loginLoading;
export const selectSignUpLoading = (state) => state.auth.signUpLoading;
export const selectAuthStatus = (state) => state.auth.status;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;
