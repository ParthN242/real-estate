import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { getListingDetailAsync } from "../Redux/Listing/listingApi";
import "swiper/css/bundle";
import Loading from "../Components/Loading";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../Components/Contact";

const ListingDetail = () => {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const dispatch = useDispatch();

  const { listingDetail, loading = true } = useSelector(
    (state) => state.listing
  );
  const { currentUser } = useSelector((state) => state.user);

  const [contact, setContact] = useState(false);

  useEffect(() => {
    dispatch(getListingDetailAsync(params.id));
  }, []);

  return (
    <main>
      {loading && !listingDetail && <Loading />}
      {listingDetail && !loading && (
        <div>
          <Swiper navigation className="bg-slate-200">
            {listingDetail.imageUrls.map((item) => (
              <SwiperSlide key={item.fileName}>
                <div
                  className="h-[90vh]"
                  style={{
                    background: `url(${item.url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listingDetail.title} - ${" "}
              {listingDetail.offer
                ? listingDetail.discountPrice.toLocaleString("en-US")
                : listingDetail.regularPrice.toLocaleString("en-US")}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-md">
              <FaMapMarkerAlt className="text-green-700" />
              {listingDetail.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listingDetail.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listingDetail.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${listingDetail.regularPrice - listingDetail.discountPrice}{" "}
                  OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listingDetail.description}
            </p>
            <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-green-900 font-semibold text-md">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listingDetail.bedrooms > 1
                  ? `${listingDetail.bedrooms} Beds`
                  : `${listingDetail.bedrooms} Bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listingDetail.bathrooms > 1
                  ? `${listingDetail.bathrooms} Baths`
                  : `${listingDetail.bathrooms} Bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listingDetail.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listingDetail.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              listingDetail.userRef._id !== currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
                >
                  Contact Landlord
                </button>
              )}
            {contact && (
              <Contact listing={listingDetail} setContact={setContact} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ListingDetail;
