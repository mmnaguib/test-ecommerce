import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginState } from "../type";
import axios from "axios";

const initialState: loginState = {
    isLoggedIn: false,
    loading: false,
    user: null,
    error: null,
    token: false
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        return response.data;
      } catch (error: any) {
          return rejectWithValue('An error occurred during login.');
      }
    }
  );
  
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: {name:string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', credentials);
      return response.data;
    } catch (error: any) {
        return rejectWithValue('An error occurred during register.');
    }
  }
);
  
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout');
      return response.data
    } catch (error: any) {
        return 'An error occurred during register.';
    }
  }
);

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers(builder) {
      builder
      .addCase(login.pending, (state) => {
        state.isLoggedIn= false;
        state.loading= false;
        state.error= null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn= true;
        state.loading= false;
        state.user= action.payload;
        state.error= null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn= false;
        state.loading= true;
        state.error= action.error.message ? action.error.message : '';
      })

      .addCase(register.pending, (state) => {
        state.isLoggedIn= false;
        state.loading= false;
        state.error= null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn= true;
        state.loading= false;
        state.user= action.payload;
        state.error= null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn= false;
        state.loading= true;
        state.error= action.error.message ? action.error.message : '';
      })
      .addCase(logout.pending, (state) => {
        state.isLoggedIn= false;
        state.loading= false;
        state.error= null;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("persist:root");
        state.isLoggedIn= false;
        state.loading= false;
        state.user= null;
        state.error= null;
        state.token= false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn= false;
        state.loading= true;
        state.error= action.error.message ? action.error.message : '';
      })
    },
});

export default AuthSlice.reducer;