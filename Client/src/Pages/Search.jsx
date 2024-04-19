import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../Components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllListing } from "../Redux/Listing/listingApi";
import Loading from "../Components/Loading";

const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  console.log("sidebardata: ", sidebardata);
  const { listings, loading = ture } = useSelector(
    (state) => state.listing.allListings
  );
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Change
  const handleChange = (e) => {
    console.log("e: ", e.target.checked);
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    )
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked === true ? true : false,
      });

    if (e.target.id === "searchTerm")
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });

    if (e.target.id === "sort") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({
        ...sidebardata,
        sort,
        order,
      });
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Show More
  const handleShowMore = () => {
    const urlParams = new URLSearchParams(location.search);
    const newLimit = listings.length + 9;
    urlParams.set("limit", newLimit);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const limitFromUrl = urlParams.get("limit");

    if (+limitFromUrl == listings.length) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }

    setSidebardata({
      ...sidebardata,
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      parking: parkingFromUrl === "true" ? true : false,
      furnished: furnishedFromUrl === "true" ? true : false,
      offer: offerFromUrl === "true" ? true : false,
      sort: sortFromUrl || "createdAt",
      order: orderFromUrl || "desc",
    });

    const searchQuery = urlParams.toString();
    // fetch Listing
    const fetchListing = async () => {
      dispatch(getAllListing(searchQuery));
    };
    fetchListing();
  }, [location.search]);

  return (
    <>
      <main className="flex max-lg:flex-col">
        {/* Form */}
        <section className="p-7 border-r-2">
          <form onSubmit={handleSubmit} className="flex gap-8 flex-col">
            <div className="flex gap-2 items-center">
              <label htmlFor="search" className="font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search here..."
                className="p-2 border-1 rounded-lg"
                onChange={handleChange}
                value={sidebardata.searchTerm}
              />
            </div>
            <div className="flex gap-2 items-center">
              <p htmlFor="search" className="font-semibold">
                Type:
              </p>
              <div className="flex gap-2">
                <input
                  className="w-5"
                  type="checkbox"
                  name=""
                  id="all"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <label htmlFor="all">Rent & Sale</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-5"
                  type="checkbox"
                  name=""
                  id="rent"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-5"
                  type="checkbox"
                  name=""
                  id="sale"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <label htmlFor="sale">Sale</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-5"
                  type="checkbox"
                  name=""
                  id="offer"
                  onChange={handleChange}
                  checked={sidebardata.offer || false}
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p htmlFor="search" className="font-semibold">
                Amenities:
              </p>
              <div className="flex gap-2">
                <input
                  className="w-5"
                  type="checkbox"
                  name=""
                  id="parking"
                  onChange={handleChange}
                />
                <label htmlFor="parking">Parking</label>
              </div>
              <div className="flex gap-2">
                <input
                  className="w-5"
                  type="checkbox"
                  name=""
                  id="furnished"
                  onChange={handleChange}
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="font-semibold">
                Sort:
              </label>
              <select
                name=""
                id="sort"
                className=" rounded-lg p-2"
                onChange={handleChange}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button
              type="submit"
              className="rounded-lg uppercase p-3 bg-slate-700 text-white"
            >
              Search
            </button>
          </form>
        </section>
        {/* Search Result */}
        <section className="flex-1 mb-6">
          <h1 className="text-2xl font-semibold p-3 relative">
            Listing results:
          </h1>
          {loading ? (
            <Loading />
          ) : (
            <div className="p-7 flex flex-wrap gap-4">
              {listings.length < 1 && (
                <h1 className="text-4xl text-red-700">No Listing Found</h1>
              )}
              {listings.map((item, index) => (
                <ListingCard key={index} listing={item} />
              ))}
            </div>
          )}
          {showMore && (
            <button
              className="text-green-700 mx-7 hover:underline"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </section>
      </main>
    </>
  );
};

export default Search;
