import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";

const ResetButton = () => {
  const { dispatch } = useContext(CompetenciesContext) as CompetencyContextType;

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      onClick={() => dispatch({ type: "reset" })}
    >
      Reset
    </button>
  );
};

export default ResetButton;
