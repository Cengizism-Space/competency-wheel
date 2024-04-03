import React from "react";
import {
  PencilSquareIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
  PhotoIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const Page = () => {
  return (
    <section className="flex flex-col gap-12 mx-auto w-full px-4 py-16 lg:flex lg:h-screen lg:items-center text-center">
      <div className="flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold sm:text-5xl text-gray-600 mr-8">
          Wheel title
        </h1>
        <button className="flex flex-row items-center text-gray-500 hover:text-red-700">
          <PencilSquareIcon className="h-6 w-6 mr-2" />
          Edit title
        </button>
      </div>

      <div className="flex flex-row gap-12 justify-center items-center rounded bg-slate-600 text-white px-8 py-6">
        <div className="text-left">
          <p className="text-lg font-medium">Link to your wheel</p>
          <button className="hover:text-slate-900">
            https://competency-wheel.vercel.app/1712122972-morning
          </button>
        </div>
        <button className="flex flex-row items-center hover:text-slate-900">
          <DocumentDuplicateIcon className="h-6 w-6 mr-2" />
          Copy to clipboard
        </button>
        <button className="flex flex-row items-center hover:text-slate-900">
          <ShareIcon className="h-6 w-6 mr-2" />
          Share
        </button>
      </div>

      <div className="w-full flex flex-row gap-12 justify-center items-center text-left rounded bg-slate-50 px-8 py-6">
        <p className="text-lg font-medium">Competency</p>

        <div className="flex flex-row gap-4">
          <label
            htmlFor="competencyTitle"
            className="block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700"> Title </span>

            <input
              type="text"
              id="competencyTitle"
              placeholder="JavaScript, User research, ..."
              className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
          </label>

          <label
            htmlFor="competencyDescription"
            className="block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              {" "}
              Description{" "}
            </span>

            <input
              type="text"
              id="competencyDescription"
              placeholder="Ability to write clean code, ..."
              className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
          </label>

          <div className="flex flex-row gap-2">
            <button className="block w-full rounded bg-red-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
              <ChevronUpIcon className="h-6 w-6" />
            </button>

            <label
              htmlFor="competencyValue"
              className="block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <span className="text-xs font-medium text-gray-700"> Value </span>

              <input
                type="number"
                id="competencyValue"
                placeholder="5"
                className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />
            </label>

            <button className="block w-full rounded bg-red-600 px-6 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
              <ChevronDownIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-center gap-12 rounded bg-slate-50 px-8 py-6">
        <div className="flex flex-row items-center gap-6">
          <button className="flex flex-row items-center text-gray-500 hover:text-red-700">
            <ArrowUturnLeftIcon className="h-6 w-6 mr-2" />
            Reset
          </button>
          |
          <button className="flex flex-row items-center text-gray-500 hover:text-red-700">
            <TrashIcon className="h-6 w-6 mr-2" />
            Delete
          </button>
        </div>
        <div className="flex-grow"></div>
        <div className="flex flex-row items-center gap-6">
          <button className="flex flex-row items-center w-full rounded px-8 py-3 text-sm font-medium text-red-600 bg-white shadow hover:bg-slate-50 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
            <PhotoIcon className="h-6 w-6 mr-2" />
            Export to PNG
          </button>
          <button className="flex flex-row items-center w-full rounded bg-green-700 px-8 py-3 text-sm font-medium text-white shadow hover:bg-green-800 focus:outline-none focus:ring active:bg-red-500 sm:w-auto">
            <BookmarkIcon className="h-6 w-6 mr-2" />
            Save your wheel
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
