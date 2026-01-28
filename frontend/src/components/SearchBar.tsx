import React, { useState } from "react";
import { Mic, Camera, LayoutGrid, History } from "lucide-react";
import Footer from "./Footer";
import { requestQuery } from "../api/api";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    if (searchQuery.trim()) {
      navigate(`/search/?q=${encodeURIComponent(searchQuery)}`, {
        state: { query: searchQuery },
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleOpenHistory = () => {
    navigate("/history");
  };
  return (
    <>
      <div className="min-h-screen min-w-screen bg-[url('/bg.jpg')]  bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center ">
        <div className="absolute top-6 right-8 text-m font-bold  flex gap-4">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            gmail
          </a>
          <a
            href="https://classroom.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            classroom
          </a>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleOpenHistory}
              className="flex items-center gap-2 font-bold cursor-pointer
                 hover:underline transition-colors"
            >
              <History className="w-5 h-5" />
              <span>History</span>
            </button>
          </div>
        </div>
        {/* <div className="absolute top-6 left-8 text-m font-bold  cursor-pointer">
        <textalignjustify />
      </div> */}
        <div className="mb-8">
          <h1 className="text-black text-7xl font-light tracking-tight">
            aleph
          </h1>
        </div>

        {/* search bar is created from here  */}
        <div className="w-full max-w-2xl mb-8">
          <div
            className={`flex items-center bg-transparent rounded-full px-5 py-3 transition-all duration-200 ${
              isFocused
                ? "shadow-lg shadow-black/80"
                : "shadow-md shadow-black/40"
            } hover:shadow-lg hover:shadow-black/40`}
          >
            <search className="text-gray-600 w-5 h-5 mr-3" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent text-black outline-none placeholder-gray-400 text-base"
              placeholder=""
            />

            <div className="flex items-center gap-3 ml-3">
              <button
                type="button"
                className="text-gray-600 hover:text-black transition-colors p-1"
                aria-label="voice search"
              >
                <Mic className="w-5 h-5" />
              </button>

              <button
                type="button"
                className="text-gray-600 hover:text-black transition-colors p-1"
                aria-label="search by image"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#303134] text-gray-300 px-6 py-3 rounded hover:bg-[#3c4043] hover:border hover:border-gray-600 transition-all text-sm"
          >
            aleph search
          </button>

          <button
            type="button"
            className="bg-[#303134] text-gray-300 px-6 py-3 rounded hover:bg-[#3c4043] hover:border hover:border-gray-600 transition-all text-sm"
          >
            whats new
          </button>
        </div>

        {/* <div className="text-black-400 text-sm">
          aleph offered in:{" "}
          <a href="#" className="text-[#10336c] hover:underline">
            नेपाली
          </a>
        </div> */}

        <div className="absolute bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
