"use client";
import React from "react";
import Competencies from "./Competencies";
import Header from "./Header";

const Main = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Competencies />
    </main>
  );
};

export default Main;
