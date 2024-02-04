import React from "react";
import { Link } from "react-router-dom";

const SuccessListing = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex flex-col gap-6 justify-center items-center min-w-full">
        <img
          src="https://cdn-icons-png.freepik.com/512/5610/5610944.png"
          alt="Successfull Listing Image"
          className="w-28 h-28"
          style={{ mixBlendMode: "multiply" }}
        />
        <h1 className="text-2xl font-semibold tracking-wide">
          Listing Created Successfully
        </h1>
        <Link
          to="/user-listings"
          className="px-6 py-3 bg-slate-700 text-white rounded-lg text-lg tracking-wider hover:opacity-90"
        >
          Show Listing
        </Link>
      </div>
    </div>
  );
};

export default SuccessListing;
