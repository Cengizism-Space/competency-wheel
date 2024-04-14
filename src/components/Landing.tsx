"use client";

import React from "react";
import { CompetenciesProvider } from "@/context";
import Templates from "./Templates";
import Link from "next/link";
import MadeBy from "./MadeBy";

const Landing: React.FC = () => {
  return (
    <CompetenciesProvider>
      <section className="grid h-screen place-content-center items-center text-center">
        <div className="mt-6 mb-4 leading-none">
          <h3 className="text-2xl text-gray-400 font-medium uppercase">
            Create your own
          </h3>
          <h1 className="text-5xl font-bold text-gray-800 mt-1">
            Competency Wheel
          </h1>

          <p className="mt-4 text-base max-w-xl text-gray-500 mx-auto leading-normal">
            You can use this tool to create your own competency wheel. It is a
            great way to visualize your skills and competencies.
          </p>
        </div>

        <div className="flex">
          <div className="mt-6 flex flex-col-reverse items-center justify-center gap-2 w-full">
            <Link
              className="flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              href="/wheel/"
            >
              Start with your own wheel
            </Link>
            <Templates />
          </div>
        </div>
      </section>

      <MadeBy />
    </CompetenciesProvider>
  );
};

export default Landing;
