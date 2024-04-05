import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";

const Wheel: React.FC<{ dimensions: { width: number; height: number } }> = ({
  dimensions,
}) => {
  const { wheel, svgRef, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  useDrawChart({ wheel, svgRef, dimensions });
  useOutsideClick(svgRef, () => {
    dispatch({ type: "setState", payload: { activeIndex: null } });
  });

  return (
    <svg
      height="100%"
      width="100%"
      preserveAspectRatio="xMinYMin slice"
      overflow="visible"
      ref={svgRef}
    />
  );
};

export default Wheel;
