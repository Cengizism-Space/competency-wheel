import React from "react";
import Pie from "./Pie";
import useContainerDimensions from "@/hooks/useContainerDimensions";

const Wheel = () => {
  const [containerRef, containerDimensions] = useContainerDimensions();

  return (
    <div className="col-span-10 grow" ref={containerRef}>
      <Pie dimensions={containerDimensions} />
    </div>
  );
};

export default Wheel;
