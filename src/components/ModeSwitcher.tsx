import React, { useContext, FC, MouseEventHandler } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import classNames from "classnames";
import {
  PencilSquareIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

interface ModeSwitcherButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
  children: React.ReactNode;
}

export const ModeSwitcherButton: FC<ModeSwitcherButtonProps> = ({
  onClick,
  active,
  children,
}) => {
  const classes = classNames(
    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative",
    {
      "bg-white text-blue-500 shadow-sm": active,
      "text-gray-500 hover:text-gray-700": !active,
    }
  );

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

const ModeSwitcher: FC = () => {
  const { isEditing, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const setOpen = (open: boolean) => {
    dispatch({
      type: "setState",
      payload: { isEditing: open },
    });
  };

  const removeQueryParam = (key: string) => {
    const url = new URL(window.location.href),
      searchParams = url.searchParams;

    searchParams.delete(key);
    url.search = searchParams.toString();
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="absolute top-7 right-7 z-10 inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      <ModeSwitcherButton onClick={() => setOpen(false)} active={!isEditing}>
        <PresentationChartLineIcon className="h-4 w-4" />
        View
      </ModeSwitcherButton>

      <ModeSwitcherButton
        onClick={() => {
          removeQueryParam("presentation");
          setOpen(true);
        }}
        active={isEditing}
      >
        <PencilSquareIcon className="h-4 w-4" />
        Edit
      </ModeSwitcherButton>
    </div>
  );
};

export default ModeSwitcher;
