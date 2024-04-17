import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { scaleValues } from "../constants";

const Help = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <div className="flex flex-col gap-2 px-8 mb-2">
        <Button onClick={openModal} variant="link">
          <InformationCircleIcon className="h-6 w-6" />
          <span className="text-sm italic">
            How are the scale values calculated?
          </span>
        </Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Competency scale values
                  </Dialog.Title>

                  <table className="border-collapse table-auto w-full text-sm my-8">
                    <thead className="bg-slate-200">
                      <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-5 pl-8 text-slate-600 dark:text-slate-200 text-left">
                          Value
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium py-5 px-4 text-slate-600 dark:text-slate-200 text-left">
                          Definition
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scaleValues.map((scale, index) => (
                        <tr
                          key={index}
                          className={index % 2 ? "bg-slate-50" : ""}
                        >
                          <td className="border-b border-slate-200 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                            {scale.value}
                          </td>
                          <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400">
                            {scale.definition}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="text-sm text-gray-500">
                    Just use lower or upper value of the range to indicate your
                    level of expertise
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Help;
