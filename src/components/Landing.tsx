"use client";

import React from "react";
import { CompetenciesProvider } from "@/context";
import Templates from "./Templates";
import Link from "next/link";
import MadeBy from "./MadeBy";

const Landing: React.FC = () => {
  return (
    <CompetenciesProvider>
      <section className="flex flex-col mx-auto w-full px-4 py-12 lg:flex lg:h-screen lg:items-center text-center">
        <div className="mt-6 mb-6">
          <h1 className="text-3xl font-medium sm:text-5xl mb-4 text-gray-400">
            Create your own
            <strong className="font-bold text-gray-800 sm:block mt-2">
              Competency Wheel
            </strong>
          </h1>

          <p className="mt-8 sm:text-xl/relaxed max-w-xl text-gray-500 text-center mx-auto">
            You can use this tool to create your own competency wheel. It is a
            great way to visualize your skills and competencies.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="mt-6 flex flex-col-reverse items-center justify-center gap-3">
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
