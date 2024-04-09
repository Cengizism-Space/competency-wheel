import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../typings";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import CompetencyToolbar from "./Competency/CompetencyToolbar";

const Pie: React.FC = () => {
  const { wheel, svgRef, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [containerRef, dimensions] = useContainerDimensions();
  useDrawChart({ wheel, svgRef, dimensions });
  useOutsideClick(svgRef, () => {
    dispatch({ type: "setState", payload: { activeIndex: null } });
  });

  return (
    <div className="col-span-9 grow relative" ref={containerRef}>
      <CompetencyToolbar />
      <svg
        height="100%"
        width="100%"
        preserveAspectRatio="xMinYMin slice"
        overflow="visible"
        ref={svgRef}
      />
    </div>
  );
};

export default Pie;
