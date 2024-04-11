import React, { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { deleteWheel } from "../../sanity/sanity";
import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";

const DeleteWheelButton = () => {
  const { wheel, link, dispatch } = useContext(
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
    link && (
      <Button onClick={handleDeleteWheel} variant="link">
        <TrashIcon className="h-6 w-6 mr-2" />
        {isDeleting ? "Deleting..." : "Delete wheel"}
      </Button>
    )
  );
};

export default DeleteWheelButton;
