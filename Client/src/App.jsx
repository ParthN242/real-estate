import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/User/userApi";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Pages/Profile";
import axios from "axios";
import CreateListing from "./Pages/CreateListing";
import SuccessListing from "./Components/SuccessListing";
import UserListing from "./Pages/UserListing";
import ListingDetail from "./Pages/ListingDetail";
import UpdateListing from "./Pages/UpdateListing";
import Search from "./Pages/Search";

axios.defaults.baseURL = "https://real-estate-api-pink.vercel.app/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
            <Route path="/user-listings" element={<UserListing />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/successful-listing" element={<SuccessListing />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
