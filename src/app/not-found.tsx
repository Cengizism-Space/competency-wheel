import React from "react";
import NotFoundComponent from "../components/NotFound";

export default function NotFound() {
  return (
    <NotFoundComponent>
      <span className="block">That page can not be found.</span>
      <a
        href="/"
        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Go Back Home
      </a>
    </NotFoundComponent>
  );
}
