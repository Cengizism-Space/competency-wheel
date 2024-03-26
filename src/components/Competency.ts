import { colors } from "../constants";
import CompetencyLabel from "./CompetencyLabel";
import { degreesToRadians } from "./utils";

const Competency = ({
  competency,
  i,
  svg,
  centerX,
  centerY,
  centerRadius,
  padding,
  totalRating,
  accumulatedRating
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

export default Competency;
