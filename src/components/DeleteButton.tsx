import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { deleteWheel } from "@/sanity";

const DeleteButton = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { wheel, dispatch, reset } = context;

  const handleDeleteWheel = useCallback(async () => {
    dispatch({ type: "setDeleting", payload: true });
    await deleteWheel(wheel.slug.current);
    dispatch({ type: "setDeleting", payload: false });
    reset();
    if (typeof window !== "undefined") {
      history.replaceState({}, "", `${window.location.origin}/`);
    }
  }, [wheel, dispatch, reset]);

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
