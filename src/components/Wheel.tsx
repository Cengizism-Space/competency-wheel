import React, { useContext, useEffect, useState } from "react";
import LinkAndShare from "./LinkAndShare";
import { fetchWheel } from "../../sanity/client";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  CompetencyType,
  WheelType,
} from "../../typings";
// import Alert from "./Alert";
import ModeSwitcher from "./ModeSwitcher";
import { Transition } from "@headlessui/react";
import Competency from "./Competency";
import WheelController from "./WheelController";
import classNames from "classnames";
import ResetButton from "./ResetButton";
import Title from "./Title";
import { createSlug } from "@/utils";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import CompetencyToolbar from "./CompetencyToolbar";
import MadeBy from "./MadeBy";

const fetchAndDispatchWheel = async (slug: string, dispatch: Function) => {
  const initialWheel = await fetchWheel(slug);
  let payload = {};

  if (initialWheel) {
    initialWheel.competencies = initialWheel.competencies ?? [];

    const wheel: WheelType = initialWheel.template
      ? {
          title: initialWheel.title,
          template: false,
          slug: {
            ...initialWheel.slug,
            current: createSlug(initialWheel.title),
          },
          competencies: initialWheel.competencies.map(
            (competency: CompetencyType) => ({ ...competency })
          ),
        }
      : initialWheel;

    payload = {
      wheel,
      initialWheel,
      isFound: true,
    };
  } else {
    payload = { isFound: false };
  }
  payload = { 
    ...payload, 
    isSaved: initialWheel.template ? false : true, 
    isInitial: true 
  };

  dispatch({
    type: "setState",
    payload,
  });
};

const Wheel: React.FC<{ slug?: string | null | undefined }> = ({ slug }) => {
  const { svgRef, isFound, isEditing, isEmpty, isSaved, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;
  const [isLoading, setIsLoading] = useState(true);

  const [containerRef, dimensions] = useContainerDimensions();
  useDrawChart({ dimensions });
  useOutsideClick(svgRef, () =>
    dispatch({ type: "setState", payload: { activeIndex: null } })
  );

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
      <ModeSwitcher />
      <div
        className={classNames("w-screen", {
          "grid grid-cols-12 gap-0 editing mx-auto": isEditing,
        })}
      >
        <div
          className={classNames("relative h-screen", {
            "col-span-9": isEditing,
          })}
        >
          <Title />

          <div className="h-[calc(100vh_-_8rem)]" ref={containerRef}>
            {isLoading && (
              <div className="grid h-screen place-content-center px-4">
                <div className="text-center">
                  <h1 className="text-5xl font-black text-gray-300">Loading</h1>
                  <p className="mt-2 tracking-tight text-gray-500">
                    Fetching the requested competency wheel
                  </p>
                </div>
              </div>
            )}

            {isEmpty && isFound && !isEmpty && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="mt-32 p-4 w-fit items-center justify-center text-center rounded-md bg-slate-50 text-gray-500 shadow">
                  Add a competency to get started
                </p>
              </div>
            )}

            {!isFound && (
              <div className="grid h-screen place-content-center px-4">
                <div className="text-center">
                  <h1 className="text-9xl font-black text-gray-300">404</h1>
                  <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Uh-oh!
                  </p>
                  <p className="mt-4 text-gray-500">
                    There is no wheel with this ID. Start creating one.
                  </p>
                </div>
              </div>
            )}

            <CompetencyToolbar />

            <svg
              height="100%"
              width="100%"
              preserveAspectRatio="xMinYMin slice"
              overflow="visible"
              ref={svgRef}
            />

            <MadeBy />
          </div>
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
          <div className="flex flex-col h-full justify-between pt-32 border-e bg-white border-l">
            <Competency />

            <div className="sticky inset-x-0 bottom-0">
              {!isEmpty && <WheelController />}
              {isSaved && <LinkAndShare />}
            </div>
          </div>
        </Transition>
      </div>

      {isEditing && <ResetButton />}
    </>
  );
};

export default Wheel;
