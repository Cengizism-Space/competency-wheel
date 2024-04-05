import React, { useEffect, useState, useContext } from "react";
import Wheel from "./Wheel";
import Title from "./Title";
import { fetchWheel } from "../../sanity/sanity";
import ResetButton from "./ResetButton";
import PNGExportButton from "./PNGExportButton";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import Link from "./Link";
import CompetencyValue from "./CompetencyValue";
import CompetencyMeta from "./CompetencyMeta";
import CompetencyRemoval from "./CompetencyRemoval";
import TemplatesMenu from "./TemplatesMenu";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";

import useContainerDimensions from "@/hooks/useContainerDimensions";

const Main: React.FC<{ slug?: string | null }> = ({ slug }) => {
  const { link, isBootstrapped, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [notFound, setNotFound] = useState(false);

  const [containerRef, containerDimensions] = useContainerDimensions();

  useEffect(() => {
    if (slug) {
      (async () => {
        const initialWheel = await fetchWheel(slug);
        if (initialWheel) {
          if (!initialWheel.competencies) {
            initialWheel.competencies = [];
          }

          dispatch({
            type: "setState",
            payload: { wheel: initialWheel, initialWheel },
          });
        } else {
          setNotFound(true);
        }
      })();
    }
  }, [slug, dispatch]);

  return (
    <section className="flex flex-col gap-12 mx-auto w-full px-4 py-12 lg:flex lg:h-screen lg:items-center text-center">
      <Title />
      {notFound && <p>Wheel not found</p>}
      {link && <Link />}

      <TemplatesMenu />

      <div className="grid grid-cols-12 gap-4 grow">
        <div className="col-span-2 grow">
          <div className="w-full flex flex-col gap-4 justify-center items-center text-left rounded bg-slate-50 px-8 py-6">
            <p className="text-lg font-medium">Competency</p>
            <div className="flex flex-col gap-4">
              <CompetencyMeta />
              <CompetencyValue />
              <CompetencyRemoval />
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-12 rounded bg-slate-50 px-8 py-6">
            <div className="flex flex-col items-center gap-6">
              <ResetButton />
              <DeleteButton />
            </div>
            <div className="flex flex-col items-center gap-6">
              <PNGExportButton />
              <SaveButton />
            </div>
          </div>
        </div>

        <div className="col-span-10 grow" ref={containerRef}>
          <Wheel dimensions={containerDimensions} />
        </div>
      </div>
    </section>
  );
};

export default Main;
