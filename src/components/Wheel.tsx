import React, {
  useContext,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import { fetchWheel } from "../../sanity/client";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  CompetencyType,
  WheelType,
} from "../../typings";
import { createSlug, defineWheelStates } from "@/utils";
import useDrawChart from "@/hooks/useDrawChart";
import useOutsideClick from "@/hooks/useOutsideClick";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import CompetencyToolbar from "./CompetencyToolbar";
import Title from "./Title";
import ModeSwitcher from "./ModeSwitcher";
import ResetButton from "./ResetButton";
import MadeBy from "./MadeBy";
import Alert from "./Alert";
import LoadingWheel from "./LoadingWheel";
import NotFound from "./NotFound";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import Help from "./Help";

const Competency = lazy(() => import("./Competency"));
const WheelController = lazy(() => import("./WheelController"));
const LinkAndShare = lazy(() => import("./LinkAndShare"));

const Wheel: React.FC<{ slug?: string | null | undefined }> = ({
  slug = null,
}) => {
  const {
    svgRef,
    wheel,
    initialWheel,
    isLoading,
    isFound,
    isEditing,
    isEmpty,
    isSaved,
    dispatch,
  } = useContext(CompetenciesContext) as CompetencyContextType;

  const [containerRef, dimensions] = useContainerDimensions();
  useDrawChart({ dimensions });
  useOutsideClick(svgRef, () =>
    dispatch({ type: "setState", payload: { activeIndex: null } })
  );

  const createPayload = useCallback((initialWheel: WheelType) => {
    if (!initialWheel) {
      return {
        isFound: false,
        isSaved: false,
        isInitial: true,
      };
    }

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

    return {
      wheel,
      initialWheel: wheel,
      link: `${window.location.origin}/wheel/${wheel?.slug.current}`,
      isFound: true,
      isSaved: !initialWheel.template,
      isInitial: true,
    };
  }, []);

  const fetchAndDispatchWheel = useCallback(
    async (slug: string) => {
      try {
        const initialWheel = await fetchWheel(slug);
        const payload = createPayload(initialWheel);

        dispatch({
          type: "setState",
          payload,
        });
      } catch (error) {
        dispatch({
          type: "setState",
          payload: {
            isErrored: true,
            errorMessage:
              "An error occurred while loading the wheel. Please try again later.",
          },
        });
      }
    },
    [createPayload, dispatch]
  );

  useEffect(() => {
    const isPresentation =
      new URLSearchParams(window.location.search).get("presentation") ===
      "true";

    dispatch({
      type: "setState",
      payload: {
        isEditing: !isPresentation && isEditing,
        isFound: slug ? false : true,
      },
    });

    if (slug) {
      fetchAndDispatchWheel(slug);
    }

    dispatch({ type: "setState", payload: { isLoading: false } });
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const { isExportable, isInitial, isEmpty } = defineWheelStates(
      wheel,
      initialWheel
    );

    dispatch({
      type: "setState",
      payload: {
        isExportable,
        isInitial,
        isEmpty,
      },
    });
  }, [wheel, initialWheel]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Alert />
      <ModeSwitcher />
      <div
        className={classNames("w-screen", {
          "grid grid-cols-12 gap-0 editing mx-auto": isEditing,
        })}
        data-testid="wheel-component"
      >
        <div
          className={classNames("relative h-screen", {
            "col-span-9": isEditing,
          })}
        >
          <Title />

          <div className="h-[calc(100vh_-_8rem)]" ref={containerRef}>
            {isLoading && <LoadingWheel />}

            {!isFound && (
              <NotFound>
                <span>There is no wheel with this ID. Start creating one.</span>
              </NotFound>
            )}

            {isEmpty && isFound && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="mt-32 p-4 items-center justify-center text-center border border-white bg-slate-50 text-gray-500">
                  Add a competency to get started
                </p>
              </div>
            )}

            <CompetencyToolbar />

            <svg
              height={isFound ? "100%" : 0}
              width={isFound ? "100%" : 0}
              preserveAspectRatio="xMinYMin slice"
              overflow="visible"
              ref={svgRef}
            />

            {!isEditing && (
              <div className="fixed bottom-4 left-6">
                <Help />

                <div className="flex flex-row items-center gap-1 text-gray-400">
                  <RocketLaunchIcon className="w-4 h-4" />
                  <span className="italic text-sm">
                    Competency is in improving
                  </span>
                </div>
              </div>
            )}

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
            <Suspense fallback={null}>
              <Competency />
            </Suspense>

            <div className="sticky inset-x-0 bottom-0">
              {!isEmpty && (
                <Suspense fallback={null}>
                  <WheelController />
                </Suspense>
              )}

              {isSaved && (
                <Suspense fallback={null}>
                  <LinkAndShare />
                </Suspense>
              )}
            </div>
          </div>
        </Transition>
      </div>

      {isEditing && <ResetButton />}
    </>
  );
};

export default Wheel;
