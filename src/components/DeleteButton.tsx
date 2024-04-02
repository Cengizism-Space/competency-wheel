import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { deleteWheel } from "@/sanity";

const DeleteButton = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { wheel, dispatch } = context;

  const handleDeleteWheel = useCallback(async () => {
    dispatch({ type: "setState", payload: { deleting: true } });
    await deleteWheel(wheel.slug.current);
    dispatch({ type: "setState", payload: { deleting: false } });
    dispatch({ type: "reset" });
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
