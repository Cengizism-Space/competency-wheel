import React from "react";
import Title from "./Title";
import Link from "./Link/Link";
import useFetchWheel from "@/hooks/useFetchWheel";
import CompetencyCard from "./Competency/CompetencyCard";
import Pie from "./Pie";

const Wheel: React.FC<{ slug?: string | null | undefined }> = ({ slug }) => {
  useFetchWheel(slug);

  return (
    <section className="flex flex-col gap-8 mx-auto w-full px-4 lg:flex lg:h-screen lg:items-center text-center">
      <Title />
      <Link />
      <div className="grid grid-cols-12 gap-4 grow">
        <CompetencyCard />
        <Pie />
      </div>
    </section>
  );
};

export default Wheel;
