import React, { useContext } from "react";
import { CompetenciesContext, CompetencyContextType } from "../context";

const ResetButton = () => {
  const context = useContext(CompetenciesContext);
  const { reset } = context as CompetencyContextType;

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      onClick={reset}
    >
      Reset
    </button>
  );
};

export default ResetButton;
