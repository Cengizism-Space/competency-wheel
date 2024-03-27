"use client";
import React from "react";
import Competencies from "./Competencies";
import Header from "./Header";
import { CompetencyProvider } from "./CompetencyContext";

const Main: React.FC = () => {
  return (
    <CompetencyProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <Competencies />
      </main>
    </CompetencyProvider>
  );
};

export default Main;
