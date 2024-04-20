import React, { useState, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";

const Alert: React.FC = () => {
  const { isErrored, errorMessage, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    setVisible(false);

    dispatch({
      type: "setState",
      payload: { isErrored: false, errorMessage: "" },
    });
  };

  return (
    isErrored &&
    errorMessage && (
      <div
        className="fixed inset-x-0 bottom-0 p-4 w-fit z-20"
        data-testid="alert-component"
      >
        <div className="relative flex items-center justify-between gap-4 rounded-lg bg-red-600 px-4 py-3 text-white shadow-lg">
          <p className="text-sm font-medium">{errorMessage}</p>

          <button
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
          >
            <XMarkIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    )
  );
};

export default Alert;
