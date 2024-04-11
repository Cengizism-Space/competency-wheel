import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import Link from "./Link";
import { fetchWheel } from "../../sanity/sanity";
import Pie from "./Pie";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import Announcer from "./Announcer";
import ModeSwitcher from "./ModeSwitcher";
import { Transition } from "@headlessui/react";
import Competency from "./Competency";
import ResetWheelButton from "./ResetWheelButton";
import ExportToPNGButton from "./ExportToPNGButton";
import SaveWheelButton from "./SaveWheelButton";
import DeleteWheelButton from "./DeleteWheelButton";

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
  const { isFound, isEditing, dispatch } = useContext(
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

      <div className="flex flex-row gap-0 w-screen">
        <ModeSwitcher />

        <div className="flex flex-col gap-0 grow">
          <Title />
          <div className="grow">
            <Pie />
          </div>
        </div>

        <Transition
          show={isEditing}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col h-full justify-between pt-24 border-e bg-white">
            <div className="flex flex-col gap-8 w-80 text-slate-600">
              <div className="w-full flex flex-col gap-4 rounded px-8 py-6">
                <p className="text-lg font-medium text-left">Competency</p>
                <Competency />
              </div>

              <div className="flex flex-col gap-4 rounded bg-slate-50 px-8 py-6 mx-8">
                <p className="text-lg font-medium text-left">Wheel</p>
                <ExportToPNGButton />
                <SaveWheelButton />
                <DeleteWheelButton />
              </div>
            </div>

            <Link />
          </div>
        </Transition>
      </div>

      <ResetWheelButton />
    </>
  );
};

export default Wheel;
