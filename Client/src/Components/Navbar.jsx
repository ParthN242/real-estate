import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", search ? search : "");
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchFromUrl = urlParams.get("searchTerm");
    setSearch(searchFromUrl);
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-xl">
      <div className="max-w-6xl p-3 max-sm:p-4 max-sm:text-sm mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl max-sm:text-lg font-bold cursor-pointer"
        >
          <span className="text-gray-500">Real</span>Estate
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-3 rounded-lg flex items-center max-sm:p-2"
        >
          <input
            type="text"
            className="outline-none w-24 sm:w-64 "
            placeholder="Search..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex items-center gap-6 text-slate-700">
          <Link to="/search">
            <li>Listings</li>
          </Link>
          <Link to="aboutus" className="max-lg:hidden">
            <li>About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <li>
                <img
                  className="w-8 h-8 rounded-full max-sm:w-6 max-sm:h-6 object-cover"
                  src={currentUser.avatar.url}
                  alt="avatar"
                />
              </li>
            </Link>
          ) : (
            <Link to="signin">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
