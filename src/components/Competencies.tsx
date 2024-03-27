import React, { useRef, useEffect, RefObject, useContext } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CompetencyController from "./CompetencyController";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";
import useDrawChart from "@/hooks/useDrawChart";

const Competencies: React.FC = () => {
  const context = useContext(CompetencyContext);
  const { competencies, activeIndex, setActiveIndex } =
    context as CompetencyContextType;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dimensions = useWindowDimensions();
  const drawChart = useDrawChart({
    svgRef,
    dimensions,
    competencies,
    activeIndex,
    setActiveIndex,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        svgRef.current &&
        (svgRef.current as unknown as HTMLElement).contains(
          event.target as Node
        )
      ) {
        setActiveIndex(null);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    drawChart;
  }, [dimensions, activeIndex, competencies]);

  return (
    <>
      <CompetencyController />
      <svg ref={svgRef as unknown as RefObject<SVGSVGElement> | undefined} />
    </>
  );
};

export default Competencies;
