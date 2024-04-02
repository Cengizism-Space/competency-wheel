import React, { useContext, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { saveWheel, updateWheel } from "@/sanity";

const SaveButton = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { wheel, fetchedWheel, savedLink, dispatch } = context;

  const saveChart = useCallback(async () => {
    dispatch({ type: "setSaving", payload: true });
    if (!savedLink) {
      await saveWheel(wheel);
      dispatch({
        type: "setSavedLink",
        payload: `${window.location.origin}/${wheel?.slug.current}`,
      });
    } else {
      await updateWheel(wheel, fetchedWheel);

      if (fetchedWheel?.slug.current !== wheel.slug.current) {
        dispatch({
          type: "setSavedLink",
          payload: `${window.location.origin}/${wheel?.slug.current}`,
        });
      }
    }
    dispatch({ type: "setSaving", payload: false });
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
