import React, { useContext, useCallback } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { deleteWheel } from "@/sanity";

const DeleteButton = () => {
  const { wheel, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const handleDeleteWheel = useCallback(async () => {
    try {
      dispatch({ type: "setState", payload: { deleting: true } });
      await deleteWheel(wheel.slug.current);
    } finally {
      dispatch({ type: "setState", payload: { deleting: false } });
      dispatch({ type: "reset" });
    }
  }, [wheel, dispatch]);

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      onClick={handleDeleteWheel}
    >
      Delete wheel
    </button>
  );
};

export default DeleteButton;
