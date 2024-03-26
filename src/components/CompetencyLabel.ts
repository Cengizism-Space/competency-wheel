import { degreesToRadians } from "./utils";

const CompetencyLabel = ({
  svg,
  centerX,
  centerY,
  padding,
  startingAngle,
  arcSize,
  competency,
}: any) => {
  const labelRadius = Math.min(centerX, centerY) - padding - 10;
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
};

export default CompetencyLabel;