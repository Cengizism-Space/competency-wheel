import React, { useRef, useEffect, useContext, useState } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "../context";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useExportToPng from "@/hooks/useExportToPng";
import CompetencyValue from "./Competency/CompetencyValue";
import CompetencyMeta from "./Competency/CompetencyMeta";
import CompetencyRemoval from "./Competency/CompetencyRemoval";
import Templates from "./Templates";
import { fetchTemplates, saveWheel } from "@/sanity";
import { DEFAULT_WHEEL } from "@/constants";

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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={exportToPng}
        >
          Export to PNG
        </button>
        &nbsp;|&nbsp;
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={saveChart}
        >
          Save chart
        </button>
        &nbsp;|&nbsp;
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={clearAll}
        >
          Clear all
        </button>
      </div>
      {saving || savedLink ? (
        <div>
          {saving && <p>Saving...</p>}
          {savedLink && <p>Saved! Link: {savedLink}</p>}
        </div>
      ) : null}
      <svg ref={svgRef} />
    </>
  );
};

export default Competencies;
