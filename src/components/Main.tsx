import React, { useEffect, useState, useContext } from "react";
import Wheel from "./Wheel";
import Title from "./Title";
import { fetchWheel } from "@/sanity";
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
import { fetchTemplates } from "@/sanity";
import { CompetenciesContext } from "@/context";

const Main: React.FC<{ slug?: string | null }> = ({ slug }) => {
  const [notFound, setNotFound] = useState(false);

  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { activeIndex, wheel, saving, savedLink, deleting, dispatch } = context;

  useEffect(() => {
    (async () => {
      const templates = await fetchTemplates();
      dispatch({ type: "setTemplates", payload: templates });
    })();

    dispatch({ type: "setSavedLink", payload: undefined });
  }, [dispatch]);

  useEffect(() => {
    if (wheel.hasOwnProperty("_id")) {
      dispatch({
        type: "setSavedLink",
        payload: `${window.location.origin}/${wheel?.slug.current}`,
      });
    }
  }, [wheel, dispatch]);

  useEffect(() => {
    if (slug) {
      (async () => {
        const wheel = await fetchWheel(slug);
        if (wheel) {
          if (!wheel.competencies) {
            wheel.competencies = [];
          }

          dispatch({ type: "setWheel", payload: wheel });
          dispatch({ type: "setFetchedWheel", payload: wheel });
        } else {
          setNotFound(true);
        }
      })();
    }
  }, [slug, dispatch]);

  const isUserEnteredWheel =
    wheel.title !== DEFAULT_TITLE || wheel.competencies.length > 0;
  const isWheelExportable =
    wheel.title.length > 0 &&
    wheel.competencies.length > 0 &&
    !saving &&
    !deleting;

  return (
    <div className="flex flex-col items-center space-y-4 mb-4">
      <Title />

      {notFound && <p>Wheel not found</p>}
      {saving && <p>Saving...</p>}
      {deleting && <p>Deleting...</p>}

      {savedLink && !saving && <Link />}

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
          {savedLink && !deleting && <DeleteButton />}
        </div>
      )}

      <Wheel />
    </div>
  );
};

export default Main;
