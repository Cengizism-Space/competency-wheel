import React, { useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "../../context";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";

const Wheel: React.FC = () => {
  const context = useContext(CompetenciesContext);
  const { setActiveIndex, svgRef } = context as CompetencyContextType;

  const dimensions = useWindowDimensions();
  useDrawChart({ svgRef, dimensions });
  useOutsideClick(svgRef, () => setActiveIndex(null));

  return <svg ref={svgRef} />;
};

export default Wheel;
