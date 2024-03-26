"use client";
import { useEffect, useState, useRef, RefObject } from "react";
import * as d3 from "d3";
import { colors } from "./constants";
import useWindowDimensions from "./useWindowDimensions";

const ratingsLabels = [
  "Vision",
  "Concept development",
  "Value proposition",
  "Contextual research",
  "User research",
  "Market research",
  "Information architecture",
  "User flow",
  "Behaviour",
  "Graphic design",
  "Data visualisation",
  "Specifications",
  "Mock-up",
  "Interactive prototype",
  "Front-end development",
  "Hardware",
  "Testing",
];

export default function Home() {
  const [ratings, setRatings] = useState(Array(ratingsLabels.length).fill(10));
  const svgRef = useRef();
  const dimensions = useWindowDimensions();

  useEffect(() => {
    const svg = svgRef.current ? d3.select(svgRef.current) : null;
    if (!svg) return;

    svg.selectAll("*").remove();

    const width = dimensions.width;
    const height = dimensions.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const centerRadius = Math.min(centerX, centerY) / 3 - 10; // Subtract a value to reduce the radius
    const padding = 10;

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const sumTo = (a: number[], i: number) =>
      a.slice(0, i).reduce((acc: number, val: number) => acc + val, 0);

    let totalRating = ratings.reduce((a, b) => a + b, 0);

    let accumulatedRating = 0;

    ratings.forEach((rating, i) => {
      const radius =
        centerRadius +
        rating * ((Math.min(centerX, centerY) - centerRadius - padding) / 10);
      const startingAngle = (accumulatedRating / totalRating) * 360;
      const arcSize = (rating / totalRating) * 360;
      const endingAngle = startingAngle + arcSize;

      accumulatedRating += rating;

      const largeArcFlag = arcSize <= 180 ? "0" : "1";

      const startX =
        centerX + radius * Math.cos(degreesToRadians(startingAngle));
      const startY =
        centerY + radius * Math.sin(degreesToRadians(startingAngle));
      const endX = centerX + radius * Math.cos(degreesToRadians(endingAngle));
      const endY = centerY + radius * Math.sin(degreesToRadians(endingAngle));

      const d = [
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

      svg
        .append("path")
        .attr("d", d)
        .attr("fill", colors[i])
        .attr("stroke", "white")
        .attr("stroke-width", 1);

      const labelRadius = Math.min(centerX, centerY) - padding - 10; // Subtract the same value
      const labelX =
        centerX +
        labelRadius * Math.cos(degreesToRadians(startingAngle + arcSize / 2));
      const labelY =
        centerY +
        labelRadius * Math.sin(degreesToRadians(startingAngle + arcSize / 2));

      const words = ratingsLabels[i].split(" ");
      const numLines = words.length;
      const fontSize = 20;
      const lineHeight = 1.2;

      let textWidth = 0;
      let textHeight = numLines * fontSize * lineHeight;

      const group = svg.append("g");

      const text = group
        .append("text")
        .attr("x", labelX)
        .attr("class", "label");

      words.forEach((word, j) => {
        const tspan = text
          .append("tspan")
          .attr("x", labelX)
          .attr(
            "dy",
            j === 0
              ? `${(-lineHeight * (numLines - 1)) / 2}em`
              : `${lineHeight}em`
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

      text
        .attr(
          "y",
          parseFloat(rect.attr("y")) + parseFloat(rect.attr("height")) / 2 + 5
        )
        .style("text-anchor", "middle"); // Add this line
    });

    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", centerRadius * 0.7)
      .attr("fill", "white");
  }, [ratings, dimensions]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <svg ref={svgRef as unknown as RefObject<SVGSVGElement> | undefined} />
      </div>
    </main>
  );
}
