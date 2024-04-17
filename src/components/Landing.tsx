"use client";

import React from "react";
import { CompetenciesProvider } from "@/context";
import Templates from "./Templates";
import Link from "next/link";
import MadeBy from "./MadeBy";
import Alert from "./Alert";
import { styles } from "./Button";

const Landing: React.FC = () => {
  return (
    <CompetenciesProvider>
      <Alert />

      <section className="grid h-screen place-content-center items-center text-center">
        <div className="mt-6 mb-5 leading-none">
          <h3 className="text-2xl text-gray-500 font-medium uppercase">
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

        <span className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
        </span>

        <div className="flex">
          <div className="mt-6 flex flex-col-reverse items-center justify-center gap-4 w-full">
            <Link className={styles.secondary} href="/wheel/">
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
