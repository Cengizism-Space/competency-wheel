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
    wheel,
    link,
    isAdjusted,
    isExportable,
    isInitial,
    dispatch,
  } = useContext(CompetenciesContext) as CompetencyContextType;

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (wheel.hasOwnProperty("_id")) {
      dispatch({
        type: "setState",
        payload: {
          link: `${window.location.origin}/${wheel?.slug.current}`,
        },
      });
    }
  }, [wheel, dispatch]);

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
    <div className="flex flex-col items-center space-y-4 mb-4">
      <Title />
      {notFound && <p>Wheel not found</p>}
      {link && <Link />}
      <div className="flex flex-row items-center space-x-4 mr-4">
        <TemplatesMenu />
        <CompetencyMeta />
      </div>
      {activeIndex !== null && <CompetencyRemoval />}
      {activeIndex !== null && <CompetencyValue />}
      <div className="flex flex-row items-center space-x-4 mr-4">
        {isAdjusted && <ResetButton />}
        {isExportable && <PNGExportButton />}
        {!isInitial && isExportable && <SaveButton />}
        {link && <DeleteButton />}
      </div>
      <Wheel />
    </div>
  );
};

export default Main;
