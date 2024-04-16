import React, { ReactNode } from "react";

interface NotFoundProps {
  children: ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({ children }) => {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-300">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Was it here before?
        </p>
        <p className="mt-4 text-gray-500">{children}</p>
      </div>
    </div>
  );
};

export default NotFound;
