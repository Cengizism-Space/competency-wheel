import { useContext, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { saveWheel, updateWheel } from "../../sanity/sanity";
import { BookmarkIcon } from "@heroicons/react/24/outline";

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
      className="flex flex-row items-center w-full rounded bg-green-700 px-8 py-3 text-sm font-medium text-white shadow hover:bg-green-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
      onClick={saveChart}
    >
      <BookmarkIcon className="h-6 w-6 mr-2" />
      {isSaving ? "Saving..." : link ? "Update wheel" : "Save wheel"}
    </button>
  );
};

export default SaveButton;
