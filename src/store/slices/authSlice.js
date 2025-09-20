// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// read persisted initial state (if any)
const saved = typeof window !== 'undefined' ? localStorage.getItem('auth') : null;
const initialState = saved
  ? JSON.parse(saved)
  : { user: null, token: null, status: 'idle', error: null };

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
    //   const res = await fetch('/api/auth', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ action: 'login', email, password }),
    //   });
    //   if (!res.ok) {
    //     const data = await res.json().catch(() => ({}));
    //     return rejectWithValue(data?.message || 'Login failed');
    //   }
    //   const data = await res.json();
      // expected response: { token, user: { name, email, role, ... } }
      const data = {
        user: { 
          name: 'Admin User', 
          email: email, 
          role: 'admin' // add role here
        },
        token: "fake-jwt-token",
        status: 'succeeded',
        error: null
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      if (typeof window !== 'undefined') localStorage.removeItem('auth');
    },
    setUserFromServer(state, action) {
      // helpful if you fetch /api/users/me on load
      const { user, token } = action.payload;
      state.user = user ?? null;
      state.token = token ?? null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user ?? null;
        state.token = action.payload.token ?? null;
        state.error = null;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth', JSON.stringify({ user: state.user, token: state.token }));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Login failed';
      });
  },
});

export const { logout, setUserFromServer } = authSlice.actions;
export default authSlice.reducer;