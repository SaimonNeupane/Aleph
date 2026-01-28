import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History, Clock, Trash2, X, ArrowLeft } from "lucide-react";

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

const STORAGE_KEY = "search_history";

export const SearchHistory: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing search history:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const removeFromHistory = (queryToRemove: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.query !== queryToRemove);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all search history?")) {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSelectHistoryItem = (selectedQuery: string) => {
    // If opened in new tab, navigate in that tab
    navigate(`/search/?q=${encodeURIComponent(selectedQuery)}`, {
      state: { query: selectedQuery },
    });
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-800 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Go back"
              >
                {/* <ArrowLeft size={24} /> */}
              </button>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <History className="w-7 h-7" />
                Search History
              </h1>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors px-4 py-2 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {history.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <History className="w-20 h-20 mx-auto mb-4 text-gray-300" />
              <p className="text-xl mb-2">No search history yet</p>
              <p className="text-sm text-gray-400">
                Your searches will appear here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <button
                    onClick={() => handleSelectHistoryItem(item.query)}
                    className="flex items-start gap-4 flex-1 text-left"
                  >
                    <Clock
                      size={22}
                      className="text-gray-400 flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <p className="text-lg text-gray-800 font-medium hover:text-blue-600 transition-colors">
                        {item.query}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item.query);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all p-2 ml-2 hover:bg-red-50 rounded-lg"
                    aria-label="Remove from history"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        {history.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {history.length} search{history.length !== 1 ? "es" : ""}
          </div>
        )}
      </div>
    </div>
  );
};
