import React, { useState } from "react";
import { Search, Mic, Camera, LayoutGrid } from "lucide-react";
import Footer from "./Footer";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Handle search logic here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="min-h-screen min-w-screen bg-[#d5d7db] flex flex-col items-center justify-center ">
        <div className="absolute top-6 right-8 text-m font-bold  flex gap-4">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Gmail
          </a>
          <a
            href="https://classroom.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Classroom
          </a>
          <div>
            <LayoutGrid />
          </div>
        </div>
        {/* <div className="absolute top-6 left-8 text-m font-bold  cursor-pointer">
        <TextAlignJustify />
      </div> */}
        <div className="mb-8">
          <h1 className="text-black text-7xl font-light tracking-tight">
            Aleph
          </h1>
        </div>

        {/* Search Bar is created from here  */}
        <div className="w-full max-w-2xl mb-8">
          <div
            className={`flex items-center bg-[#e2e4e9] rounded-full px-5 py-3 transition-all duration-200 ${
              isFocused
                ? "shadow-lg shadow-black/40"
                : "shadow-md shadow-black/20"
            } hover:shadow-lg hover:shadow-black/40`}
          >
            <Search className="text-gray-600 w-5 h-5 mr-3" />

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
                aria-label="Voice search"
              >
                <Mic className="w-5 h-5" />
              </button>

              <button
                type="button"
                className="text-gray-600 hover:text-black transition-colors p-1"
                aria-label="Search by image"
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
            Aleph Search
          </button>

          <button
            type="button"
            className="bg-[#303134] text-gray-300 px-6 py-3 rounded hover:bg-[#3c4043] hover:border hover:border-gray-600 transition-all text-sm"
          >
            Whats New
          </button>
        </div>

        <div className="text-black-400 text-sm">
          Aleph offered in:{" "}
          <a href="#" className="text-[#10336c] hover:underline">
            नेपाली
          </a>
        </div>
        <div className="absolute bottom-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
