import React, { useContext, useEffect, useState } from "react";
import LinkAndShare from "./LinkAndShare";
import { fetchWheel } from "../../sanity/client";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  CompetencyType,
  WheelType,
} from "../../typings";
import Alert from "./Alert";
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
  if (initialWheel) {
    if (!initialWheel.competencies) {
      initialWheel.competencies = [];
    }

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

    dispatch({
      type: "setState",
      payload: {
        wheel,
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
  const { wheel, svgRef, isFound, isEditing, isEmpty, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;
  const [isLoading, setIsLoading] = useState(true);

  const [containerRef, dimensions] = useContainerDimensions();
  useDrawChart({ wheel, svgRef, dimensions });
  useOutsideClick(svgRef, () => {
    dispatch({ type: "setState", payload: { activeIndex: null } });
  });

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
      {isLoading && <Alert>Loading the wheel..</Alert>}
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
            {isEmpty && isFound && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Add a competency to get started</p>
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
