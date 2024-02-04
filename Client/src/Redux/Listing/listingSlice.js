import { createSlice } from "@reduxjs/toolkit";
import {
  deleteListingAsync,
  getAllListing,
  getAllUserListingAsync,
  getHomeListingAsync,
  getListingDetailAsync,
} from "./listingApi";

const initialState = {
  success: false,
  loading: true,
  allListings: { loading: true, error: null, listings: [] },
  listingDetail: {},
  homeListing: {},
  error: null,
  isDeleted: false,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // Get All User Listing
    builder.addCase(getAllUserListingAsync.pending, (state, action) => {
      state.success = false;
      state.loading = true;
      state.allListings = [];
      state.error = null;
    });
    builder.addCase(getAllUserListingAsync.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.allListings = action.payload.listings;
      state.error = null;
    });
    builder.addCase(getAllUserListingAsync.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.allListings = [];
      state.error = action.payload.message;
    });
    // Delete Listing
    builder.addCase(deleteListingAsync.pending, (state, action) => {
      state.success = false;
      state.loading = true;
      state.error = null;
      state.isDeleted = false;
    });
    builder.addCase(deleteListingAsync.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
      state.isDeleted = true;
    });
    builder.addCase(deleteListingAsync.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload.message;
      state.isDeleted = false;
    });
    // Get Listing Detail
    builder.addCase(getListingDetailAsync.pending, (state, action) => {
      state.success = false;
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getListingDetailAsync.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.listingDetail = action.payload.listing;
      state.error = null;
    });
    builder.addCase(getListingDetailAsync.rejected, (state, action) => {
      state.success = false;
      state.loading = false;
      state.error = action.payload.message;
    });
    // Get All Listing
    builder.addCase(getAllListing.pending, (state, action) => {
      state.success = false;
      state.allListings.loading = true;
      state.allListings.error = null;
    });
    builder.addCase(getAllListing.fulfilled, (state, action) => {
      state.success = true;
      state.allListings.loading = false;
      state.allListings.listings = action.payload.listings;
      state.allListings.error = null;
    });
    builder.addCase(getAllListing.rejected, (state, action) => {
      state.success = false;
      state.allListings.loading = false;
      state.allListings.error = action.payload.message;
      state.allListings.listings = [];
    });
    // Home Listing
    builder.addCase(getHomeListingAsync.pending, (state, action) => {
      state.homeListing.success = true;
      state.homeListing.loading = true;
      state.homeListing.error = null;
    });
    builder.addCase(getHomeListingAsync.fulfilled, (state, action) => {
      state.homeListing.success = true;
      state.homeListing.loading = false;
      state.homeListing.offerListing = action.payload.offerListing.slice(0, 4);
      state.homeListing.rentListing = action.payload.rentListing.slice(0, 4);
      state.homeListing.saleListing = action.payload.saleListing.slice(0, 4);
      state.homeListing.recentListing = action.payload.recentListing.slice(
        0,
        4
      );
      state.homeListing.error = null;
    });
    builder.addCase(getHomeListingAsync.rejected, (state, action) => {
      state.homeListing.success = true;
      state.homeListing.loading = false;
      state.homeListing.error = action.payload.message;
      state.homeListing.offerListing = [];
      state.homeListing.rentListing = [];
      state.homeListing.saleListing = [];
      state.homeListing.recentListing = [];
    });
  },
});

export default listingSlice.reducer;

export const { clearState } = listingSlice.actions;

export const listingState = (state) => state.listing;
