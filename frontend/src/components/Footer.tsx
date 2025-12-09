import React from "react";

const Footer = () => {
  return (
    <div className="h-16 min-w-screen [url('/bg.jpg')] shadow-lg shadow-black/80">
      {" "}
      {/* border-gray-200 border-2 bg-[#e2e4e9] */}
      <div className="h-full flex items-center justify-center gap-8">
        <a href="/pages/about" className="text-gray-600 hover:underline">
          About
        </a>
        <a href="/pages/privacy" className="text-gray-600 hover:underline">
          Privacy
        </a>
        <a href="/pages/terms" className="text-gray-600 hover:underline">
          Terms
        </a>
        <a href="/pages/settings" className="text-gray-600 hover:underline">
          Settings
        </a>
      </div>
    </div>
  );
};

export default Footer;
