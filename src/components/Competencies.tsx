import React, { useRef, useEffect, RefObject, useContext } from "react";
import CompetencyController from "./CompetencyController";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";

const Competencies: React.FC = () => {
  const context = useContext(CompetencyContext);
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
      <CompetencyController />
      <svg ref={svgRef as unknown as RefObject<SVGSVGElement> | undefined} />
    </>
  );
};

export default Competencies;
