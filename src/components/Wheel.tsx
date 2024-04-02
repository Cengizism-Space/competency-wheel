import React, { useContext } from "react";
import { CompetenciesContext } from "../context";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";

const Wheel: React.FC = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { svgRef, dispatch } = context;

  const dimensions = useWindowDimensions();
  useDrawChart({ svgRef, dimensions });
  useOutsideClick(svgRef, () => {
    dispatch({ type: "setState", payload: { activeIndex: null } });
  });

  return <svg ref={svgRef} />;
};

export default Wheel;
