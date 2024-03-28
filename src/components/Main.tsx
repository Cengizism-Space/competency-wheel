"use client";
import React from "react";
import Competencies from "./Competencies";
import Header from "./Header";
import { CompetenciesProvider } from "./CompetenciesContext";

const Main: React.FC = () => {
  return (
    <CompetenciesProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <Competencies />
      </main>
    </CompetenciesProvider>
  );
};

export default Main;
