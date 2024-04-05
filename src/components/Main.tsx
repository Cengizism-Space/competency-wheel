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

const Main: React.FC<{ slug?: string | null }> = ({ slug }) => {
  const {
    activeIndex,
    link,
    isExportable,
    isInitial,
    isBootstrapped,
    dispatch,
  } = useContext(CompetenciesContext) as CompetencyContextType;

  const [notFound, setNotFound] = useState(false);

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
      {isBootstrapped && (
        <div className="w-full flex flex-row gap-12 justify-center items-center text-left rounded bg-slate-50 px-8 py-6">
          <p className="text-lg font-medium">Competency</p>
          <div className="flex flex-row gap-4">
            <CompetencyMeta />
            {activeIndex !== null && <CompetencyValue />}
            {activeIndex !== null && <CompetencyRemoval />}
          </div>
        </div>
      )}
      {!isBootstrapped && <TemplatesMenu />}
      <Wheel />
      {isBootstrapped && (
        <div className="w-full flex flex-row items-center gap-12 rounded bg-slate-50 px-8 py-6">
          <div className="flex flex-row items-center gap-6">
            <ResetButton />
            {link && (
              <>
                |
                <DeleteButton />
              </>
            )}
          </div>
          <div className="flex-grow"></div>
          <div className="flex flex-row items-center gap-6">
            {isExportable && <PNGExportButton />}
            {!isInitial && isExportable && <SaveButton />}
          </div>
        </div>
      )}
    </section>
  );
};

export default Main;
