import { colors } from "../constants";
import CompetencyLabel from "./CompetencyLabel";
import { degreesToRadians } from "../utils";

const CompetencyArc = ({
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
}: any) => {
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
      ? `M ${centerX} ${centerY} m -${radius}, 0 a ${radius},${radius} 0 1,0 ${
          radius * 2
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

  svg
    .append("path")
    .attr(
      "class",
      `arc ${activeIndex === i || activeIndex === null ? "active" : "inactive"}`
    )
    .attr("d", d)
    .attr("fill", colors[i])
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .on("click", () => setActiveIndex(i))
    .append("title")
    .text(competency.description);

  CompetencyLabel({
    svg,
    centerX,
    centerY,
    padding,
    startingAngle,
    arcSize,
    competency,
  });

  return accumulatedRating;
};

export default CompetencyArc;
