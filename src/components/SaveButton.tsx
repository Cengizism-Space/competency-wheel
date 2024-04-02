import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { saveWheel, updateWheel } from "@/sanity";

const SaveButton = () => {
  const { wheel, fetchedWheel, savedLink, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const urlWithSlug = `${window.location.origin}/${wheel?.slug.current}`;
  const updateSavedLink = () => {
    dispatch({
      type: "setState",
      payload: {
        savedLink: urlWithSlug,
      },
    });
  };

  const saveChart = useCallback(async () => {
    dispatch({ type: "setSaving", payload: true });

    if (!savedLink) {
      await saveWheel(wheel);
      updateSavedLink();
    } else {
      await updateWheel(wheel, fetchedWheel);

      if (fetchedWheel?.slug.current !== wheel.slug.current) {
        updateSavedLink();
      }
    }

    dispatch({ type: "setState", payload: { saving: false } });
    if (typeof window !== "undefined" && wheel) {
      history.replaceState({}, "", urlWithSlug);
    }
  }, [savedLink, wheel, fetchedWheel, dispatch]);

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
