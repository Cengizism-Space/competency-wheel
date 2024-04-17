import { useEffect, useContext, useMemo } from 'react';
import * as d3 from 'd3';
import { CompetencyType, CompetencyContextType } from '@/../typings';
import { degreesToRadians } from "@/utils";
import { colors, TO_BE_IMPROVED_ICON } from "@/constants";
import { CompetenciesContext } from "@/context";

const useDrawChart = ({ dimensions }: { dimensions: { width: number; height: number } }) => {
  const { wheel, svgRef, activeIndex, isEditing, dispatch } = useContext(CompetenciesContext) as CompetencyContextType;

  const drawChart = (competencies: CompetencyType[], palette: string[]) => {
    const svg = svgRef.current ? d3.select(svgRef.current) : null;
    if (!svg) return;

    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const centerRadius = Math.max(0, Math.min(centerX, centerY) / 3 - 10);
    const padding = 100;

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

    let totalRating = competencies.reduce((a, b) => a + b.value, 0);

    let accumulatedRating = 0;

    const arcs: any[] = [];
    const labels: any[] = [];

    competencies.forEach((competency: CompetencyType, i: number) => {
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
        competencies.length === 1
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

      const arc = svg
        .append("path")
        .attr(
          "class",
          `arc ${activeIndex === i || activeIndex === null ? "active" : "inactive"}`
        )
        .attr("d", d)
        .attr("fill", palette[i])
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .on("click",
          () => isEditing && wheel.competencies.length > 0 ?
            dispatch({
              type: "setState",
              payload: {
                activeIndex: i,
                activeLabelCoords: {
                  x: (labelX + textWidth / 2) + 16,
                  y: (labelY - textHeight / 2) + 120
                }
              }
            }) : null
        )
        .append("title")
        .text(competency.description || "");

      arcs.push(arc);

      if (competency.title === "") return;

      const labelRadius = Math.min(centerX, centerY) - padding - 10;
      const labelX =
        centerX +
        labelRadius * Math.cos(degreesToRadians(startingAngle + arcSize / 2));
      const labelY =
        centerY +
        labelRadius * Math.sin(degreesToRadians(startingAngle + arcSize / 2));

      const words = competency.title.split(" ");
      const numLines = words.length;
      const fontSize = 12;
      const lineHeight = 1.2;

      let textWidth = 0;
      let textHeight = numLines * fontSize * lineHeight;

      const group = svg.append("g")
        .attr("class", `label ${activeIndex === i || activeIndex === null ? "active" : "inactive"}`);

      if (competency.improvement) {
        const iconX = labelX - 8;
        const iconY = labelY - textHeight / 2 - 26;

        group.append("path")
          .attr("d", TO_BE_IMPROVED_ICON)
          .attr("transform", `translate(${iconX}, ${iconY}) scale(1)`)
          .attr("fill", "currentColor");
      }

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
        .attr("x", labelX - textWidth / 2 - 11)
        .attr("y", labelY - textHeight / 2 - 6)
        .attr("width", textWidth + 20)
        .attr("height", textHeight + 20)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", "rgba(255, 255, 255, 0.75)");

      text
        .attr(
          "y",
          parseFloat(rect.attr("y")) + parseFloat(rect.attr("height")) / 2 + 5
        )
        .style("text-anchor", "middle");
    });

    arcs.forEach(arc => svg.node()?.appendChild(arc.node()));
    labels.forEach(label => svg.node()?.appendChild(label.node()));

    competencies.length > 0 && svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", centerRadius * 0.4)
      .attr("fill", "rgba(235, 235, 235)")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .on("click", () => dispatch({ type: "setState", payload: { activeIndex: null } }));
  };

  const { competencies, palette } = useMemo(() => {
    let competencies: CompetencyType[];
    let palette: string[];

    if (wheel.competencies.length === 0) {
      competencies = Array.from({ length: 20 }, (_, index) => ({
        title: "",
        description: "",
        improvement: false,
        value: (index % 10) + 1,
      }));
      palette = [
        ...colors.grayscale,
        ...colors.grayscale,
      ];
    } else {
      competencies = wheel.competencies;
      palette = colors.rainbow;
    }

    return { competencies, palette };
  }, [wheel.competencies]);

  useEffect(() => {
    drawChart(competencies, palette);
  }, [dimensions, wheel, isEditing, activeIndex, competencies, palette]); // eslint-disable-line

  useEffect(() => {
    dispatch({ type: "setState", payload: { activeIndex: null } });
  }, [dimensions, dispatch]);
};

export default useDrawChart;