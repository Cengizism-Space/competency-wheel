"use client";

import React from "react";
import { CompetenciesProvider } from "@/context";
import Main from "./Main";

const App: React.FC<{ slug?: string | null }> = ({ slug }) => {
  return (
    <CompetenciesProvider>
      <Main slug={slug} />
    </CompetenciesProvider>
  );
};

export default App;
