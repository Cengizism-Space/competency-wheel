import React, { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { deleteWheel } from "@/sanity";

const DeleteButton = () => {
  const { wheel, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteWheel = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteWheel(wheel.slug.current);
    } finally {
      setIsDeleting(false);
      dispatch({ type: "reset" });
    }
  }, [wheel, dispatch]);

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md"
      onClick={handleDeleteWheel}
    >
      {isDeleting ? "Deleting..." : "Delete wheel"}
    </button>
  );
};

export default DeleteButton;
