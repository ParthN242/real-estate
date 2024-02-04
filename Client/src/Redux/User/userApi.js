import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/signin", userData, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Sign Up
export const signUpUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/signup", userData);
      return data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/me");
      return data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "user/update",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://localhost:2000/api/user/update/${user.id}`,
        user.formData
      );
      return data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
// Signout User
export const signOuteUser = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:2000/api/auth/signout`
      );
      return data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/delete/${id}`);
      return data;
    } catch (error) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
