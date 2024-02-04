import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHomeListingAsync } from "../Redux/Listing/listingApi";
import Loading from "../Components/Loading";
import ListingCard from "../Components/ListingCard";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";

const ListingSlide = ({ title, listing, query }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl text-slate-500 font-semibold max-sm:text-lg">
        {title}
      </h1>
      <Link
        to={`/search?${query}`}
        className="text-blue-800 hover:underline text-sm "
      >
        Show more
      </Link>
      <div className="flex flex-wrap gap-6">
        {listing.map((item, index) => (
          <ListingCard key={index} listing={item} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useDispatch();

  const {
    loading = true,
    offerListing,
    rentListing,
    saleListing,
    recentListing,
  } = useSelector((state) => state.listing.homeListing);

  useEffect(() => {
    dispatch(getHomeListingAsync());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="">
          <section className="py-28 px-3 max-w-6xl mx-auto flex flex-col gap-6">
            <h1 className="text-6xl max-lg:text-3xl font-bold text-slate-700 capitalize">
              Find your next <span className="text-slate-500">perfect</span>{" "}
              <br /> place with ease
            </h1>
            <p className="max-w-lg text-slate-500 max-sm:text-sm">
              Sahand Estate is the best place to find your next perfect place to
              live. We have a wide range of properties for you to choose from.
            </p>
            <Link
              to={"/search"}
              className="font-bold hover:underline text-blue-700 transition-all duration-300 max-sm:text-xs"
            >
              Let's get started...
            </Link>
          </section>

          {/* Slide Bar */}
          <section>
            <Swiper navigation>
              {recentListing.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    style={{
                      background: `url(${item.imageUrls[0].url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                    className="h-[700px] max-lg:h-[400px] max-sm:h-[300px]"
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/*Listings */}
          <section className="max-w-6xl mx-auto my-10">
            <div className="flex flex-col gap-6">
              {saleListing.length > 0 && (
                <ListingSlide
                  title={"Recent Place For Sale"}
                  listing={saleListing}
                  query="type=sale"
                />
              )}
              {rentListing.length > 0 && (
                <ListingSlide
                  title={" Recent places for rent"}
                  listing={rentListing}
                  query="type=rent"
                />
              )}
              {offerListing.length > 0 && (
                <ListingSlide
                  title={"Recent offers"}
                  listing={offerListing}
                  query="offer=true"
                />
              )}
              {recentListing.length > 0 && (
                <ListingSlide
                  title={"New Listings"}
                  listing={recentListing}
                  query="sort=createdAt&order=desc"
                />
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default Home;
