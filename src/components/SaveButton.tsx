import { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { saveWheel, updateWheel } from "@/sanity";

const SaveButton = () => {
  const { wheel, fetchedWheel, savedLink, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);

    if (!savedLink) {
      await saveWheel(wheel);
      updateSavedLink();
    } else {
      await updateWheel(wheel, fetchedWheel);

      if (fetchedWheel?.slug.current !== wheel.slug.current) {
        updateSavedLink();
      }
    }

    setIsSaving(false);
    if (typeof window !== "undefined" && wheel) {
      history.replaceState({}, "", urlWithSlug);
    }
  }, [savedLink, wheel, fetchedWheel, dispatch, updateSavedLink, urlWithSlug]);

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md"
      onClick={saveChart}
    >
      {isSaving ? "Saving..." : savedLink ? "Update wheel" : "Save wheel"}
    </button>
  );
};

export default SaveButton;
