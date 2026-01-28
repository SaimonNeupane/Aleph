import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { requestQuery } from "../api/api";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Mic, Camera } from "lucide-react";

interface SearchResultItem {
  url: string;
  title: string;
  content: string;
}

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

const STORAGE_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const searchQueryValue = location.state;
  const [searchQuery, setSearchQuery] = useState(searchQueryValue?.query || "");
  const [isFocused, setIsFocused] = useState(false);

  // Add current query to history when query changes
  useEffect(() => {
    if (query) {
      addToHistory(query);
      setSearchQuery(query);
    }
  }, [query]);

  const addToHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    let history: SearchHistoryItem[] = [];

    if (stored) {
      try {
        history = JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing search history:", error);
      }
    }

    const filtered = history.filter((item) => item.query !== searchQuery);
    const updated = [
      { query: searchQuery, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleOpenHistory = () => {
    // Open history page in new tab
    window.open("/history", "_blank");
  };

  console.log("searchQueryValue:", searchQuery);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["result", query],
    queryFn: () => requestQuery(query),
    enabled: true,
  });

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    if (searchQuery.trim()) {
      navigate(`/search/?q=${encodeURIComponent(searchQuery)}`, {
        state: { query: searchQuery },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading results...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-lg text-red-600">
          An error occurred while fetching results
        </div>
      </div>
    );
  }

  const yes = data && data.length > 0;

  if (!yes) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 text-lg">
          Oops! Not crawled yet
        </div>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(data.length / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = data.slice(indexOfFirstResult, indexOfLastResult);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="absolute top-6 right-10 px-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleOpenHistory}
            className="flex items-center gap-2 font-semibold cursor-pointer
                 hover:underline transition-colors"
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 relative">
        {/* Results count */}
        <div className="mb-6 text-sm text-gray-600">
          About {data.length} results for "{query}"
        </div>

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
              onChange={(e) => handleChange(e)}
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

        {/* Search results */}
        <div className="space-y-6">
          {currentResults.map((item: SearchResultItem, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <a
                href={item.url}
                className="text-xl text-blue-600 hover:underline font-medium mb-1 block"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
              <div className="text-sm text-green-700 mb-2 truncate">
                {item.url}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {item.content.slice(0, 100)}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 mb-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) => (
                <React.Fragment key={idx}>
                  {page === "..." ? (
                    <span className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`min-w-10 px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white font-semibold shadow-sm"
                          : "text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Page info */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
