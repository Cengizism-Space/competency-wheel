import React from "react";

const LoadingWheel = () => {
  return (
    <div
      className="grid h-screen place-content-center px-4"
      data-testid="loading-wheel-component"
    >
      <div className="text-center">
        <h1 className="text-5xl font-black text-gray-300">Loading</h1>
        <p className="mt-2 tracking-tight text-gray-500">
          Fetching the requested competency wheel
        </p>
      </div>
    </div>
  );
};

export default LoadingWheel;
