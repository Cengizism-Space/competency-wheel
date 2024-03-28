import { useEffect } from 'react';
import * as d3 from 'd3';
import { CompetencyType } from "../constants";
import CompetencyArc from "../components/CompetencyArc";

interface DrawChartProps {
  svgRef: React.RefObject<SVGSVGElement>;
  dimensions: { width: number; height: number };
  competencies: CompetencyType[];
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const useDrawChart = ({ svgRef, dimensions, competencies, activeIndex, setActiveIndex }: DrawChartProps) => {
  useEffect(() => {
    const drawChart = () => {
      const svg = svgRef.current ? d3.select(svgRef.current) : null;
      if (!svg) return;

      svg.selectAll("*").remove();

      const width = dimensions.width;
      const height = dimensions.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const centerRadius = Math.max(0, Math.min(centerX, centerY) / 3 - 10);
      const padding = 30;

      svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent")
        .on("click", () => setActiveIndex(null));

      let totalRating = competencies.reduce((a, b) => a + b.value, 0);

      let accumulatedRating = 0;

      competencies.forEach((competency: CompetencyType, i: number) => {
        accumulatedRating = CompetencyArc({
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

      competencies.length > 0 && svg
        .append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", centerRadius * 0.6)
        .attr("fill", "rgba(235, 235, 235)")
        .on("click", () => setActiveIndex(null));
    };

    drawChart();
  }, [svgRef, dimensions, competencies, activeIndex, setActiveIndex]);
};

export default useDrawChart;