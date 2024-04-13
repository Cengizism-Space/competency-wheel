import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface AlertProps {
  children: React.ReactNode | string;
}

const Alert: React.FC<AlertProps> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 w-fit z-20">
      <div className="relative flex items-center justify-between gap-4 rounded-lg bg-red-600 px-4 py-3 text-white shadow-lg">
        <p className="text-sm font-medium">{children}</p>

        <button
          onClick={handleClose}
          aria-label="Close"
          className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
        >
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
