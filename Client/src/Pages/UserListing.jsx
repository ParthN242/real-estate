import React, { useEffect, useState } from "react";
import {
  deleteListingAsync,
  getAllUserListingAsync,
} from "../Redux/Listing/listingApi";
import { useDispatch, useSelector } from "react-redux";
import { clearState, listingState } from "../Redux/Listing/listingSlice";
import Loading from "../Components/Loading";
import { Link } from "react-router-dom";

const UserListing = () => {
  const dispatch = useDispatch();

  const { allListings, loading, success, error, isDeleted } =
    useSelector(listingState);

  const [delSuccess, setDelSuccess] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteListingAsync(id));
  };
  if (isDeleted === true) {
    dispatch(getAllUserListingAsync());
    dispatch(clearState());
    setDelSuccess(true);
    setTimeout(() => setDelSuccess(false), 2000);
  }
  useEffect(() => {
    dispatch(getAllUserListingAsync());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto">
      {allListings.length <= 0 && (
        <div className="flex flex-col items-center justify-center gap-8 h-[80vh]">
          <h1 className="text-4xl font-semibold text-center">
            No Listing Added
          </h1>
          <Link
            to="/create-listing"
            className="rounded-lg mx-auto  bg-slate-700 text-white py-4 px-6"
          >
            Create Listing
          </Link>
        </div>
      )}
      {allListings.length > 0 && (
        <>
          <h1 className="text-center text-3xl my-6">Your Listing</h1>
          <div className="flex flex-col gap-4 bg-white p-4 rounded-lg ">
            {allListings.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border gap-3"
              >
                <img
                  src={item.imageUrls[0].url}
                  alt="image"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <Link className="text-lg hover:underline font-semibold truncate max-lg:text-sm">
                  {item.title}
                </Link>
                <div className="flex px-4 gap-2 max-lg:text-sm">
                  <Link
                    to={`/update-listing/${item._id}`}
                    className="uppercase bg-green-700 text-white px-4 py-1 rounded-lg"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="uppercase bg-red-700 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {error && <p className="text-red-700 my-2">{error}</p>}
            {delSuccess && (
              <p className="text-green-700 my-2">
                Listing Deleted Successfully
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserListing;
