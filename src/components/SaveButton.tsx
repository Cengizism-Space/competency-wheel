import { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { saveWheel, updateWheel } from "../../sanity/sanity";

const SaveButton = () => {
  const { wheel, initialWheel, link, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [isSaving, setIsSaving] = useState(false);

  const urlWithSlug = `${window.location.origin}/${wheel?.slug.current}`;
  const updateLink = () => {
    dispatch({
      type: "setState",
      payload: {
        link: urlWithSlug,
      },
    });
  };

  const saveChart = useCallback(async () => {
    setIsSaving(true);

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
  }, [link, wheel, initialWheel, dispatch, updateLink, urlWithSlug]);

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-md"
      onClick={saveChart}
    >
      {isSaving ? "Saving..." : link ? "Update wheel" : "Save wheel"}
    </button>
  );
};

export default SaveButton;
