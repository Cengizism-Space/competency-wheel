import { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../../typings";
import { saveWheel, updateWheel } from "../../../../sanity/sanity";

const SaveButton = () => {
  const { wheel, initialWheel, isInitial, isExportable, link, dispatch } =
    useContext(CompetenciesContext) as CompetencyContextType;

  const [isSaving, setIsSaving] = useState(false);

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

  return (
    !isInitial &&
    isExportable && (
      <button className="primary button" onClick={saveChart}>
        {isSaving ? "Saving..." : link ? "Update wheel" : "Save wheel"}
      </button>
    )
  );
};

export default SaveButton;
