"use client";

import React from "react";

const Page = () => {
  return (
    <section className="flex flex-col mx-auto w-full px-4 py-32 lg:flex lg:h-screen lg:items-center text-center">
      <div className="mb-10">
        <h1 className="text-3xl font-bold sm:text-5xl mb-4 text-gray-600">
          Create your own
          <strong className="font-extrabold text-red-700 sm:block mt-2">
            Competency Wheel
          </strong>
        </h1>

        <p className="mt-8 sm:text-xl/relaxed max-w-xl text-center mx-auto">
          You can use this tool to create your own competency wheel. It is a
          great way to visualize your skills and competencies.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        <button className="block w-full rounded bg-red-600 px-12 py-3 text-lg font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
          Start Fresh
        </button>

        <span className="text-sm italic text-gray-600">or</span>

        <div className="text-left">
          <p className="mb-4">
            <span className="text-sm italic text-gray-600">
              Choose a template
            </span>
          </p>

          <button className="mb-4 block w-full rounded px-6 py-4 text-left font-medium bg-white text-gray-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
            <span className="text-lg">User Experience Designer</span>
            <span className="block text-gray-500 italic font-normal text-sm">
              User Research, Wireframing, Prototyping, ...
            </span>
          </button>

          <button className="block w-full rounded px-6 py-4 text-left font-medium bg-white text-gray-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
            <span className="text-lg">Frontend Developer</span>
            <span className="block text-gray-500 italic font-normal text-sm">
              TypeScript, React, TailwindCSS, Next.js, ...
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
