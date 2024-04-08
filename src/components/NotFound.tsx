import React from "react";

const NotFound = () => {
  return (
    <section className="flex flex-col gap-8 mx-auto w-full px-4 lg:flex lg:h-screen lg:items-center text-center">
      <p className="flex flex-row gap-12 justify-center items-center rounded bg-slate-600 text-white px-8 py-6 text-lg font-medium">
        Not found!
        <a href="/" className="hover:text-slate-900">
          Create a new wheel
        </a>
      </p>
    </section>
  );
};

export default NotFound;
