import React, { Fragment, useContext, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { saveWheel, updateWheel, deleteWheel } from "../../sanity/client";
import Button from "@/components/Button";
import useExportToPng from "@/hooks/useExportToPng";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

const WheelController = () => {
  const {
    wheel,
    initialWheel,
    isInitial,
    isExportable,
    link,
    isSaved,
    svgRef,
    dispatch,
  } = useContext(CompetenciesContext) as CompetencyContextType;

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState(false);

  const exportToPng = useExportToPng(svgRef, wheel?.title ?? "");

  const urlWithSlug =
    typeof window !== "undefined"
      ? `${window.location.origin}/wheel/${wheel?.slug.current}`
      : "";

  const handleSaveWheel = useCallback(async () => {
    try {
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

      dispatch({
        type: "setState",
        payload: {
          initialWheel: wheel,
          isSaved: true,
        },
      });

      setIsSaving(false);
      if (typeof window !== "undefined" && wheel) {
        history.replaceState({}, "", urlWithSlug);
      }
    } catch (error) {
      setIsSaving(false);

      dispatch({
        type: "setState",
        payload: {
          isErrored: true,
          errorMessage:
            "An error occurred while saving the wheel. Please try again later.",
        },
      });
    }
  }, [link, wheel, initialWheel, dispatch, urlWithSlug]);

  const handleDeleteWheel = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteWheel(wheel.slug.current);
      setIsDeleting(false);
      window.location.assign(window.location.origin);
    } catch (error) {
      setIsDeleting(false);
      setIsDeleteConfirmationDialogOpen(false);

      dispatch({
        type: "setState",
        payload: {
          isErrored: true,
          errorMessage:
            "An error occurred while deleting the wheel. Please try again later.",
        },
      });
    }
  }, [wheel, dispatch]);

  return (
    <div className="flex flex-col gap-4 rounded bg-slate-50 p-8 pb-4">
      {isExportable && (
        <Button onClick={exportToPng} variant="secondary">
          <PhotoIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium"> Download image </span>
        </Button>
      )}

      {isSaved && (
        <div className="mx-1">
          <Button
            onClick={() => setIsDeleteConfirmationDialogOpen(true)}
            variant="link"
          >
            <TrashIcon className="text-red-500 h-4 w-4" />
            <span className="text-sm text-red-400 font-medium">
              Delete wheel
            </span>
          </Button>
        </div>
      )}

      {/* {!isInitial && ( */}
        <Button onClick={handleSaveWheel} disabled={isSaving}>
          {isSaving ? "Saving" : link ? "Update" : "Save"}
        </Button>
      {/* )} */}

      <Transition appear show={isDeleteConfirmationDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDeleteConfirmationDialogOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete competencies wheel
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      This is an one time action and can not be undone.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      onClick={handleDeleteWheel}
                      disabled={isDeleting}
                      variant="danger"
                    >
                      {isDeleting ? "Deleting" : "Got it, delete it!"}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default WheelController;
