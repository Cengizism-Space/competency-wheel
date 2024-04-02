import React, { useContext, useCallback } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { deleteWheel } from "@/sanity";

const DeleteButton = () => {
  const context = useContext(CompetenciesContext);
  const { wheel, setDeleting, reset: clearAll } = context as CompetencyContextType;

  const handleDeleteWheel = useCallback(async () => {
    setDeleting(true);
    await deleteWheel(wheel.slug.current);
    setDeleting(false);
    clearAll();
    if (typeof window !== "undefined") {
      history.replaceState({}, "", `${window.location.origin}/`);
    }
  }, [wheel, clearAll]);

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
