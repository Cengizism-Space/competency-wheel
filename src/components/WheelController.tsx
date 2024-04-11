import React, { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { saveWheel, updateWheel } from "../../sanity/sanity";
import Button from "@/components/commons/Button";
import useExportToPng from "@/hooks/useExportToPng";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { deleteWheel } from "../../sanity/sanity";
import { TrashIcon } from "@heroicons/react/24/outline";

const WheelController = () => {
  const {
    wheel,
    initialWheel,
    isInitial,
    isExportable,
    link,
    svgRef,
    dispatch,
  } = useContext(CompetenciesContext) as CompetencyContextType;

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const exportToPng = useExportToPng(svgRef);

  const urlWithSlug =
    typeof window !== "undefined"
      ? `${window.location.origin}/wheel/${wheel?.slug.current}`
      : "";

  const saveChart = useCallback(async () => {
    setIsSaving(true);

    const updateLink = () => {
      dispatch({
        type: "setState",
        payload: {
          link: urlWithSlug,
        },
      });
    };

    if (!link) {
      await saveWheel(wheel);
      updateLink();
    } else {
      await updateWheel(wheel, initialWheel);

      if (initialWheel?.slug.current !== wheel.slug.current) {
        updateLink();
      }
    }

    setIsSaving(false);
    if (typeof window !== "undefined" && wheel) {
      history.replaceState({}, "", urlWithSlug);
    }
  }, [link, wheel, initialWheel, dispatch, urlWithSlug]);

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
    <div className="flex flex-col gap-4 rounded bg-slate-50 p-8 pb-4">
      {!isInitial && isExportable && (
        <Button onClick={saveChart}>
          {isSaving ? "Saving..." : link ? "Update wheel" : "Save wheel"}
        </Button>
      )}
      {isExportable && (
        <Button onClick={exportToPng} variant="secondary">
          <PhotoIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium"> Export to PNG </span>
        </Button>
      )}
      {link && (
        <div className="mx-1">
          <Button onClick={handleDeleteWheel} variant="link">
            <TrashIcon className="text-red-500 h-4 w-4" />
            <span className="text-sm text-red-400 font-medium">
              {isDeleting ? "Deleting..." : "Delete wheel"}{" "}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WheelController;
