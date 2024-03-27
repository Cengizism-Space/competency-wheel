"use client";
import React from "react";
import Chart from "./Chart";
import Header from "./Header";

const Main = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <Chart />
    </main>
  );
};

export default Main;
