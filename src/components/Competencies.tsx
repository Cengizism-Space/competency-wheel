import * as d3 from "d3";
import { useState, useRef, useEffect, RefObject } from "react";
import { UXCompetencies, CompetencyType } from "../constants";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Competency from "./Competency";
import CompetencyController from "./CompetencyController";

export default function Competencies() {
  const svgRef = useRef();
  const dimensions = useWindowDimensions();
  const [competencies, setCompetencies] =
    useState<CompetencyType[]>(UXCompetencies);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    drawChart();
  }, [dimensions, activeIndex, competencies]);

  const drawChart = () => {
    const svg = svgRef.current ? d3.select(svgRef.current) : null;
    if (!svg) return;

    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const centerRadius = Math.max(0, Math.min(centerX, centerY) / 3 - 10);
    const padding = 10;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    let totalRating = competencies.reduce((a, b) => a + b.value, 0);

    let accumulatedRating = 0;

    competencies.forEach((competency: CompetencyType, i: number) => {
      accumulatedRating = Competency({
        competencies,
        competency,
        i,
        svg,
        centerX,
        centerY,
        centerRadius,
        padding,
        totalRating,
        accumulatedRating,
        activeIndex,
        setActiveIndex,
      });
    });

    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", centerRadius * 0.6)
      .attr("fill", "rgba(235, 235, 235)");
  };

  return (
    <>
      <CompetencyController
        competencies={competencies}
        setCompetencies={setCompetencies}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <svg ref={svgRef as unknown as RefObject<SVGSVGElement> | undefined} />
    </>
  );
}
