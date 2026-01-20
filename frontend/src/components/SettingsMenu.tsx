import React from "react";

interface SettingsMenuProps {
  onClose?: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  return (
    <div className="bg-linear-to-r from-gray-600 to-gray-700 shadow-xl rounded-lg p-3 min-w-[300px] min-h-[120px] border border-gray-300 relative">
      <button
        className="absolute top-1 right-2 text-gray-300 hover:text-red-600 text-2xl "
        onClick={onClose}
        aria-label="Close settings"
      >
        ×
      </button>
      <div className="text-lg font-semibold mb-2 text-white">Settings</div>
      <div className="text-black">Histry</div>
      <div>Downloads</div>
      <div>content </div>
    </div>
  );
};

export default SettingsMenu;
