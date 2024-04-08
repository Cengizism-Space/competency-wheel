"use client";

import React from "react";
import { CompetenciesProvider } from "@/context";
import Wheel from "./Wheel/Wheel";

const App: React.FC<{ slug?: string | null }> = ({ slug }) => {
  return (
    <CompetenciesProvider>
      <Wheel slug={slug} />
    </CompetenciesProvider>
  );
};

export default App;