import React, { useRef, useEffect, useContext } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "./CompetenciesContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useExportToPng from "@/hooks/useExportToPng";
import CompetencyValue from "./Competency/CompetencyValue";
import CompetencyMeta from "./Competency/CompetencyMeta";
import CompetencyRemoval from "./Competency/CompetencyRemoval";
import Templates from "./Templates";

const Competencies: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const {
    title,
    competencies,
    setCompetencies,
    activeIndex,
    setActiveIndex,
    template,
  } = context as CompetencyContextType;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const exportToPng = useExportToPng(svgRef);
  const dimensions = useWindowDimensions();
  useDrawChart({ svgRef, dimensions });
  useOutsideClick(svgRef, () => setActiveIndex(null));

  useEffect(() => {
    setCompetencies(template);
  }, [template, setCompetencies]);

  const saveChart = () => {
    console.log({
      name: title,
      competencies,
    });
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
        <button onClick={exportToPng}>Export to PNG</button>
        <button onClick={saveChart}>Save chart</button>
      </div>
      <svg ref={svgRef} />
    </>
  );
};

export default Competencies;
