import React from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const ResetButton = () => {
  return (
    <a
      href="/"
      className="flex flex-row items-center text-gray-500 hover:text-red-700"
    >
      <ArrowUturnLeftIcon className="h-6 w-6 mr-2" />
      Restart
    </a>
  );
};

export default ResetButton;
