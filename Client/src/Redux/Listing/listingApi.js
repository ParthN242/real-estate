import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Listing
export const createListing = async (listingData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post("/api/listing/create", listingData);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data?.meesage || error.message);
    }
  });
};
// Update Listing
export const updateListing = async (id, listingData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.patch(`/api/listing/${id}`, listingData);
      resolve(data);
    } catch (error) {
      reject(error?.response?.data?.meesage || error.message);
    }
  });
};

// All Listing
export const getAllListing = createAsyncThunk(
  "listing/allListing",
  async (searchQuery = null, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/listing/get?${searchQuery}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get All User Listing
export const getAllUserListingAsync = createAsyncThunk(
  "listing/getAllUsersListings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/user/listings");

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

// Delete Listing
export const deleteListingAsync = createAsyncThunk(
  "listing/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/listing/${id}`);
      return data;
    } catch (error) {
      // console.log("error: ", error?.response?.data);
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

// Get Listing Detail
export const getListingDetailAsync = createAsyncThunk(
  "listing/detail",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/listing/${id}`);

      return data;
    } catch (error) {
      // console.log("error: ", error?.response?.data);
      return rejectWithValue(error?.response?.data || error);
    }
  }
);

// Get All Home Listing
export const getHomeListingAsync = createAsyncThunk(
  "listing/homeListings",
  async (_, { rejectWithValue }) => {
    try {
      const Offerdata = await axios.get("/api/listing/get?offer=true");
      const offerListing = Offerdata.data.listings;

      const rentData = await axios.get("/api/listing/get?type=rent");
      const rentListing = rentData.data.listings;

      const saleData = await axios.get("/api/listing/get?type=sale");
      const saleListing = saleData.data.listings;

      const recenData = await axios.get(
        "/api/listing/get?sort=createAt&order=desc"
      );
      const recentListing = recenData.data.listings;

      const data = {
        success: true,
        offerListing,
        rentListing,
        saleListing,
        recentListing,
      };

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error);
    }
  }
);
