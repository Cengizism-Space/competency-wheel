import React, { useContext } from "react";
import { CompetenciesContext } from "../context";

const ResetButton = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { dispatch } = context;

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
