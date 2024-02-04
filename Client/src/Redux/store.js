import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import listingReducer from "./Listing/listingSlice";

const reducers = combineReducers({
  user: userReducer,
  listing: listingReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
