import React, { useContext, useCallback } from "react";
import { CompetenciesContext, CompetencyContextType } from "@/context";
import { saveWheel, updateWheel } from "@/sanity";

const SaveButton = () => {
  const context = useContext(CompetenciesContext);
  const { wheel, fetchedWheel, setSaving, savedLink, setSavedLink } =
    context as CompetencyContextType;

  const saveChart = useCallback(async () => {
    setSaving(true);
    if (!savedLink) {
      await saveWheel(wheel);
      setSavedLink(`${window.location.origin}/${wheel?.slug.current}`);
    } else {
      await updateWheel(wheel, fetchedWheel);

      if (fetchedWheel?.slug.current !== wheel.slug.current) {
        setSavedLink(`${window.location.origin}/${wheel?.slug.current}`);
      }
    }
    setSaving(false);
    if (typeof window !== "undefined" && wheel) {
      history.replaceState(
        {},
        "",
        `${window.location.origin}/${wheel.slug.current}`
      );
    }
  }, [savedLink, wheel, fetchedWheel]);

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md"
      onClick={saveChart}
    >
      {savedLink ? "Update wheel" : "Save wheel"}
    </button>
  );
};

export default SaveButton;
