"use client";
import React from "react";
import Competencies from "./Competencies";
import Header from "./Header";
import { CompetenciesProvider } from "./CompetenciesContext";

const Main: React.FC = () => {
  return (
    <CompetenciesProvider>
      <Header />
      <Competencies />
    </CompetenciesProvider>
  );
};

export default Main;
