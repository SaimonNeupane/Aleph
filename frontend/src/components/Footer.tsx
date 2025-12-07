import React from "react";

const Footer = () => {
  return (
    <div className="h-16 min-w-screen border-gray-200 border-2 bg-[#e2e4e9] shadow-lg shadow-black/80">
      <div className="h-full flex items-center justify-center gap-8">
        <a href="#" className="text-gray-600 hover:underline">
          About
        </a>
        <a href="#" className="text-gray-600 hover:underline">
          Privacy
        </a>
        <a href="#" className="text-gray-600 hover:underline">
          Terms
        </a>
        <a href="#" className="text-gray-600 hover:underline">
          Settings
        </a>
      </div>
    </div>
  );
};

export default Footer;
