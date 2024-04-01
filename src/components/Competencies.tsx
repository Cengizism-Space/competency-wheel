import React, { useRef, useEffect, useContext, useState } from "react";
import { CompetenciesContext, CompetencyContextType } from "../context";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useExportToPng from "@/hooks/useExportToPng";
import CompetencyValue from "./Competency/CompetencyValue";
import CompetencyMeta from "./Competency/CompetencyMeta";
import CompetencyRemoval from "./Competency/CompetencyRemoval";
import Templates from "./Templates";
import { fetchTemplates, saveWheel, deleteWheel } from "@/sanity";
import { DEFAULT_WHEEL, DEFAULT_TITLE } from "@/constants";

const Competencies: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const { activeIndex, setActiveIndex, wheel, setWheel, setTemplates } =
    context as CompetencyContextType;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const exportToPng = useExportToPng(svgRef);
  const dimensions = useWindowDimensions();
  useDrawChart({ svgRef, dimensions });
  useOutsideClick(svgRef, () => setActiveIndex(null));

  useEffect(() => {
    (async () => {
      const templates = await fetchTemplates();
      setTemplates(templates);
    })();
  }, []);

  const [saving, setSaving] = useState(false);
  const [savedLink, setSavedLink] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const saveChart = async () => {
    setSaving(true);
    const newlyWheel = await saveWheel(wheel);
    setSavedLink(newlyWheel?.slug.current);
    setSaving(false);
  };

  const clearAll = () => {
    setWheel(DEFAULT_WHEEL);
    setActiveIndex(null);
    setSavedLink(null);
    setSaving(false);
  };

  const handleDeleteWheel = async () => {
    setDeleting(true);
    await deleteWheel(wheel.slug.current);
    setDeleting(false);
    clearAll();
  };

  const isUserEnteredWheel =
    wheel.title !== DEFAULT_TITLE || wheel.competencies.length > 0;
  const isWheelExportable =
    wheel.title.length > 0 &&
    wheel.competencies.length > 0 &&
    !saving &&
    !deleting;
  const isWheelSavedPreviously = wheel._id;

  return (
    <>
      <div className="flex flex-rows items-center space-y-4 mb-8">
        <div className="columns-2 gap-8">
          <Templates />
          <CompetencyMeta />
        </div>
        {activeIndex !== null && (
          <>
            <CompetencyRemoval />
            <CompetencyValue />
          </>
        )}
      </div>
      <div>
        {isUserEnteredWheel && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={clearAll}
          >
            Clear all
          </button>
        )}
        {isWheelExportable && (
          <>
            &nbsp;|&nbsp;
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={exportToPng}
            >
              Export to PNG
            </button>
            &nbsp;|&nbsp;
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={saveChart}
            >
              Save wheel
            </button>
          </>
        )}
        {isWheelSavedPreviously && (
          <>
            &nbsp;|&nbsp;
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={handleDeleteWheel}
            >
              Delete wheel
            </button>
          </>
        )}
      </div>
      {saving || savedLink ? (
        <div>
          {saving && <p>Saving...</p>}
          {savedLink && <p>Saved! Link: {savedLink}</p>}
        </div>
      ) : null}
      {deleting && <p>Deleting...</p>}
      <svg ref={svgRef} />
    </>
  );
};

export default Competencies;
