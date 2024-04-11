"use client";

import React from "react";
import { CompetenciesProvider } from "@/context";
import Wheel from "./Wheel";
import Frame from "./Frame";

const App: React.FC<{ slug?: string | null }> = ({ slug }) => {
  return (
    <CompetenciesProvider>
      <Wheel slug={slug} />
      {/* <Frame /> */}
    </CompetenciesProvider>
  );
};

export default App;