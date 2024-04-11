import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import CompetencyToolbar from "./CompetencyToolbar";

const Pie: React.FC = () => {
  const { wheel, svgRef, isEmpty, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [containerRef, dimensions] = useContainerDimensions();
  useDrawChart({ wheel, svgRef, dimensions });
  useOutsideClick(svgRef, () => {
    dispatch({ type: "setState", payload: { activeIndex: null } });
  });

  return (
    <div className="relative grow w-auto h-screen" ref={containerRef}>
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">
            Add a competency to get started
          </p>
        </div>
      )}
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
