import * as d3 from "d3";
import { useRef, useEffect, RefObject } from "react";
import { competencies, CompetencyType } from "../constants";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Competency from "./Competency";

export default function Chart() {
  const svgRef = useRef();
  const dimensions = useWindowDimensions();

  useEffect(() => {
    drawChart();
  }, [dimensions]);

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
        competency,
        i,
        svg,
        centerX,
        centerY,
        centerRadius,
        padding,
        totalRating,
        accumulatedRating,
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
    <svg ref={svgRef as unknown as RefObject<SVGSVGElement> | undefined} />
  );
}
