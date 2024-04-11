import React from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const ResetWheelButton = () => {
  return (
    <div className="fixed bottom-4 left-4">
      <a
        href="/"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
      >
        <ArrowUturnLeftIcon className="h-4 w-4 mr-2" />
        Restart
      </a>
    </div>
  );
};

export default ResetWheelButton;
