import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import LinkAndShare from "./LinkAndShare";
import { fetchWheel } from "../../sanity/sanity";
import Pie from "./Pie";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import Announcer from "./commons/Announcer";
import ModeSwitcher from "./ModeSwitcher";
import { Transition } from "@headlessui/react";
import Competency from "./Competency";
import WheelController from "./WheelController";
import classNames from "classnames";
import ResetButton from "./ResetButton";

const fetchAndDispatchWheel = async (slug: string, dispatch: Function) => {
  const initialWheel = await fetchWheel(slug);
  if (initialWheel) {
    if (!initialWheel.competencies) {
      initialWheel.competencies = [];
    }

    dispatch({
      type: "setState",
      payload: {
        wheel: initialWheel,
        initialWheel,
        isFound: true,
      },
    });
  } else {
    dispatch({
      type: "setState",
      payload: { isFound: false },
    });
  }
};

const Wheel: React.FC<{ slug?: string | null | undefined }> = ({ slug }) => {
  const { wheel, isFound, isEditing, isEmpty, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch({
      type: "setState",
      payload: { isFound: slug ? false : true },
    });

    if (slug) {
      fetchAndDispatchWheel(slug, dispatch);
    }

    setIsLoading(false);
  }, [slug, dispatch]);

  return (
    <>
      {isLoading && <Announcer>Loading the wheel..</Announcer>}
      {!isLoading && !isFound && (
        <Announcer>
          Wheel not found!{" "}
          <a href="/" className="hover:text-slate-900">
            Create a new wheel
          </a>
        </Announcer>
      )}

      <ModeSwitcher />

      <div
        className={classNames({
          "grid grid-cols-12 gap-0 editing": isEditing,
          "w-screen": !isEditing,
        })}
      >
        <div
          className={classNames({
            "col-span-9": isEditing,
            "w-screen": !isEditing,
          })}
        >
          <Title />
          <Pie />
        </div>

        <Transition
          show={isEditing}
          className="col-span-3"
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col h-full justify-between pt-32 border-e bg-white">
            <Competency />

            <div className="sticky inset-x-0 bottom-0">
              {!isEmpty && <WheelController />}
              {!isEmpty && <LinkAndShare />}
            </div>
          </div>
        </Transition>
      </div>

      {isEditing && <ResetButton />}
    </>
  );
};

export default Wheel;
