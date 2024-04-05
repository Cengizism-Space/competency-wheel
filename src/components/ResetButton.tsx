import React, { useContext } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const ResetButton = () => {
  const { dispatch } = useContext(CompetenciesContext) as CompetencyContextType;

  return (
    <button
      className="flex flex-row items-center text-gray-500 hover:text-red-700"
      onClick={() => {
        dispatch({
          type: "reset",
        });
      }}
    >
      <ArrowUturnLeftIcon className="h-6 w-6 mr-2" />
      Restart
    </button>
  );
};

export default ResetButton;
