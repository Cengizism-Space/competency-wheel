import React from "react";
import Title from "./Title";
import Link from "./Link/Link";
import TemplatesMenu from "./TemplatesMenu";
import useFetchWheel from "@/hooks/useFetchWheel";
import Competency from "./Competency/Competency";
import Wheel from "./Wheel/Wheel";

const Main: React.FC<{ slug?: string | null | undefined }> = ({ slug }) => {
  useFetchWheel(slug);

  return (
    <section className="flex flex-col gap-12 mx-auto w-full px-4 py-12 lg:flex lg:h-screen lg:items-center text-center">
      <Title />
      <Link />
      <div className="grid grid-cols-12 gap-4 grow">
        <Competency />
        <Wheel />
      </div>

      <TemplatesMenu />
    </section>
  );
};

export default Main;
