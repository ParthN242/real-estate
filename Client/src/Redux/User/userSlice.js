import { createSlice } from "@reduxjs/toolkit";
import {
  signOuteUser,
  loadUser,
  loginUser,
  signUpUser,
  updateUser,
  deleteUser,
} from "./userApi";

const initialState = {
  currentUser: null,
  loading: true,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.error = null;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = action.payload;
      state.success = false;
    });
    // Update
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.error = null;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    // Sign Up
    builder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.success = false;
    });
    // Load
    builder.addCase(loadUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.currentUser = null;
    });
    // Sign Out
    builder.addCase(signOuteUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signOuteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signOuteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.currentUser = null;
    });
    // Delete User
    builder.addCase(deleteUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.currentUser = null;
    });
  },
});

export const { clearState } = userSlice.actions;

export const userState = (state) => state.user;

export default userSlice.reducer;
