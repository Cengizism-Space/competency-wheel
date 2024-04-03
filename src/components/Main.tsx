import React, { useEffect, useState, useContext } from "react";
import Wheel from "./Wheel";
import Title from "./Title";
import { fetchWheel } from "../../sanity/sanity";
import { DEFAULT_TITLE } from "@/constants";
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
  const { activeIndex, wheel, savedLink, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (wheel.hasOwnProperty("_id")) {
      dispatch({
        type: "setState",
        payload: {
          savedLink: `${window.location.origin}/${wheel?.slug.current}`,
        },
      });
    }
  }, [wheel, dispatch]);

  useEffect(() => {
    if (slug) {
      (async () => {
        const fetchedWheel = await fetchWheel(slug);
        if (fetchedWheel) {
          if (!fetchedWheel.competencies) {
            fetchedWheel.competencies = [];
          }

          dispatch({
            type: "setState",
            payload: { wheel: fetchedWheel, fetchedWheel },
          });
        } else {
          setNotFound(true);
        }
      })();
    }
  }, [slug, dispatch]);

  const isUserEnteredWheel =
    wheel.title !== DEFAULT_TITLE || wheel.competencies.length > 0;
  const isWheelExportable =
    wheel.title.length > 0 && wheel.competencies.length > 0;

  return (
    <div className="flex flex-col items-center space-y-4 mb-4">
      <Title />
      {notFound && <p>Wheel not found</p>}
      {savedLink && <Link />}
      <div className="flex flex-row items-center space-x-4 mr-4">
        <TemplatesMenu />
        <CompetencyMeta />
      </div>
      {activeIndex !== null && <CompetencyRemoval />}
      {activeIndex !== null && <CompetencyValue />}
      {isWheelExportable && (
        <div className="flex flex-row items-center space-x-4 mr-4">
          {isUserEnteredWheel && <ResetButton />}
          <PNGExportButton />
          <SaveButton />
          {savedLink && <DeleteButton />}
        </div>
      )}
      <Wheel />
    </div>
  );
};

export default Main;
