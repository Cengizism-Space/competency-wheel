import React, { useRef, useEffect, RefObject, useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "./CompetenciesContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import CompetencyValue from "./Competency/CompetencyValue";
import CompetencyMeta from "./Competency/CompetencyMeta";
import CompetencyRemoval from "./Competency/CompetencyRemoval";
import Templates from "./Templates";

const Competencies: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const {
    competencies,
    setCompetencies,
    activeIndex,
    setActiveIndex,
    template,
  } = context as CompetencyContextType;

  useEffect(() => {
    setCompetencies(template);
  }, [template, setCompetencies]);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dimensions = useWindowDimensions();
  const drawChart = useDrawChart({
    svgRef,
    dimensions,
    competencies,
    activeIndex,
    setActiveIndex,
  });

  useOutsideClick(svgRef, () => setActiveIndex(null));

  useEffect(() => {
    drawChart;
  }, [dimensions, activeIndex, competencies, drawChart]);

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
      <svg ref={svgRef as unknown as RefObject<SVGSVGElement> | undefined} />
    </>
  );
};

export default Competencies;
