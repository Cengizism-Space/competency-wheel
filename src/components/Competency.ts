import { colors } from "../constants";

const Competency = ({
  competency,
  i,
  svg,
  centerX,
  centerY,
  centerRadius,
  padding,
  totalRating,
  accumulatedRating,
  degreesToRadians,
}: any) => {
  const rating = competency.value;
  const radius =
    centerRadius +
    rating * ((Math.min(centerX, centerY) - centerRadius - padding) / 10);
  const startingAngle = (accumulatedRating / totalRating) * 360;
  const arcSize = (rating / totalRating) * 360;
  const endingAngle = startingAngle + arcSize;

  accumulatedRating += rating;

  const largeArcFlag = arcSize <= 180 ? "0" : "1";

  const startX = centerX + radius * Math.cos(degreesToRadians(startingAngle));
  const startY = centerY + radius * Math.sin(degreesToRadians(startingAngle));
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

  const words = competency.name.split(" ");
  const numLines = words.length;
  const fontSize = 20;
  const lineHeight = 1.2;

  let textWidth = 0;
  let textHeight = numLines * fontSize * lineHeight;

  const group = svg.append("g");

  const text = group.append("text").attr("x", labelX).attr("class", "label");

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

  text
    .attr(
      "y",
      parseFloat(rect.attr("y")) + parseFloat(rect.attr("height")) / 2 + 5
    )
    .style("text-anchor", "middle");

  return accumulatedRating;
};

export default Competency;
