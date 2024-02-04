import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-all w-[330px] max-sm:w-full rounded-lg overflow-hidden ">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0].url}
          alt={listing.name}
          className="h-[220px] w-full object-cover hover:scale-105 transition-all duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          <div>
            <p className="truncate text-lg font-semibold text-slate-700">
              {listing.title}
            </p>
          </div>
          <div className="flex items-center gap-2 truncate w-full">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-slate-500 text-sm">{listing.address}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm line-clamp-2">
              {listing.description}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-md font-semibold mt-2">
              $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
            </p>
          </div>
          <div className="flex gap-2 text-sm text-slate-700 font-semibold">
            <p>{listing.bedrooms} Beds</p>
            <p>{listing.bathrooms} Bath</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
