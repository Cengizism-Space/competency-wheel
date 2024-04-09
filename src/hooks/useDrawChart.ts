import { useEffect, useContext } from 'react';
import * as d3 from 'd3';
import { CompetencyType, CompetencyContextType, WheelType } from '@/../typings';
import { degreesToRadians } from "@/utils";
import { colors } from "@/constants";
import { CompetenciesContext } from "@/context";

const useDrawChart = ({
  wheel,
  svgRef,
  dimensions
}: {
  wheel: WheelType;
  svgRef: React.RefObject<SVGSVGElement>;
  dimensions: { width: number; height: number };
}) => {
  const { activeIndex, dispatch } = useContext(CompetenciesContext) as CompetencyContextType;

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
      const padding = 50;

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
        .on("click", () => dispatch({ type: "setState", payload: { activeIndex: null } }));

      let totalRating = wheel.competencies.reduce((a, b) => a + b.value, 0);

      let accumulatedRating = 0;

      const arcs: any[] = [];
      const labels: any[] = [];

      wheel.competencies.forEach((competency: CompetencyType, i: number) => {
        const rating = competency.value;
        const radius =
          centerRadius +
          Math.abs(
            rating * ((Math.min(centerX, centerY) - centerRadius - padding) / 10)
          );
        const startingAngle = (accumulatedRating / totalRating) * 360;
        const arcSize = (rating / totalRating) * 360;
        const endingAngle = startingAngle + arcSize;

        accumulatedRating += rating;

        const largeArcFlag = arcSize <= 180 ? "0" : "1";

        const startX = centerX + radius * Math.cos(degreesToRadians(startingAngle));
        const startY = centerY + radius * Math.sin(degreesToRadians(startingAngle));
        const endX = centerX + radius * Math.cos(degreesToRadians(endingAngle));
        const endY = centerY + radius * Math.sin(degreesToRadians(endingAngle));

        const d =
          wheel.competencies.length === 1
            ? `M ${centerX} ${centerY} m -${radius}, 0 a ${radius},${radius} 0 1,0 ${radius * 2
            },0 a ${radius},${radius} 0 1,0 -${radius * 2},0`
            : [
              "M",
              centerX,
              centerY,
              "L",
              startX,
              startY,
              "A",
              radius,
              radius,
              0,
              largeArcFlag,
              1,
              endX,
              endY,
              "Z",
            ].join(" ");

        const labelRadius = Math.min(centerX, centerY) - padding - 10;
        const labelX =
          centerX +
          labelRadius * Math.cos(degreesToRadians(startingAngle + arcSize / 2));
        const labelY =
          centerY +
          labelRadius * Math.sin(degreesToRadians(startingAngle + arcSize / 2));

        const words = competency.title.split(" ");
        const numLines = words.length;
        const fontSize = 20;
        const lineHeight = 1.2;

        let textWidth = 0;
        let textHeight = numLines * fontSize * lineHeight;

        const group = svg.append("g")
          .attr("class", `label ${activeIndex === i || activeIndex === null ? "active" : "inactive"}`)

        const text = group.append("text")
          .attr("x", labelX);

        words.forEach((word: string, j: number) => {
          const tspan = text
            .append("tspan")
            .attr("x", labelX)
            .attr(
              "dy",
              j === 0 ? `${(-lineHeight * (numLines - 1)) / 2}em` : `${lineHeight}em`
            )
            .text(word);

          const computedTextLength = tspan.node()?.getComputedTextLength();
          if (computedTextLength) {
            textWidth = Math.max(textWidth, computedTextLength);
          }
        });

        const rect = group
          .insert("rect", ":first-child")
          .attr("x", labelX - textWidth / 2 - 5)
          .attr("y", labelY - textHeight / 2 - 5)
          .attr("width", textWidth + 10)
          .attr("height", textHeight + 10)
          .attr("rx", 5)
          .attr("ry", 5)
          .style("fill", "rgba(255, 255, 255, 0.75)");

        labels.push(rect);

        text
          .attr(
            "y",
            parseFloat(rect.attr("y")) + parseFloat(rect.attr("height")) / 2 + 5
          )
          .style("text-anchor", "middle");

        const arc = svg
          .append("path")
          .attr(
            "class",
            `arc ${activeIndex === i || activeIndex === null ? "active" : "inactive"}`
          )
          .attr("d", d)
          .attr("fill", colors[i])
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .on("click",
            () => dispatch({
              type: "setState",
              payload: {
                activeIndex: i,
                activeLabelCoords: {
                  x: (labelX + textWidth / 2) + 16,
                  y: (labelY - textHeight / 2) - 6
                }
              }
            })
          )
          .append("title")
          .text(competency.description || "");

        arcs.push(arc);
      });

      arcs.forEach(arc => svg.node()?.appendChild(arc.node()));
      labels.forEach(label => svg.node()?.appendChild(label.node()));

      wheel.competencies.length > 0 && svg
        .append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", centerRadius * 0.4)
        .attr("fill", "rgba(235, 235, 235)")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .on("click", () => dispatch({ type: "setState", payload: { activeIndex: null } }));
    };

    drawChart();
  }, [svgRef, dimensions, wheel, activeIndex, dispatch]); // eslint-disable-line
};

export default useDrawChart;