import React, { useState, useRef, FormEvent, useContext } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { createSlug } from "@/utils";
import { PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

const Title = () => {
  const { wheel, isFound, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => {
    if (isEditing) {
      setIsEditing(false);
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "setState",
      payload: {
        wheel: {
          ...wheel,
          title: event.target.value,
          slug: {
            ...wheel.slug,
            current: createSlug(event.target.value),
          },
        },
      },
    });
  };

  return (
    isFound && (
      <>
        <header className="flex justify-center">
          <div className="mx-auto pt-8 pb-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            {/* <div className="absolute inset-x-0 top-28 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div> */}

            <div className="sm:flex sm:items-center sm:justify-between">
              <div
                className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center text-center"
                ref={ref}
              >
                {isEditing ? (
                  // flex flex-row items-center h-32
                  <form className="" onSubmit={handleSubmit}>
                    <input
                      value={wheel.title}
                      onChange={handleTitleChange}
                      onBlur={() => setIsEditing(false)}
                      autoFocus
                      className="text-3xl font-bold sm:text-5xl text-gray-600 mr-8 bg-transparent focus:outline-none focus:ring-0 line-height-1"
                    />
                    {/* <Button type="submit" variant="link">
                      <CheckIcon className="h-6 w-6 mr-2" />
                      Save title
                    </Button> */}
                  </form>
                ) : (
                  <div className="flex items-center">
                    {/* flex flex-row items-center h-32 */}
                    <h1
                      className="inline-flex text-3xl font-bold sm:text-5xl text-gray-600"
                      onClick={handleEdit}
                    >
                      {wheel.title}
                    </h1>
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:none"
                      type="button"
                    >
                      <span className="text-sm font-medium"> Edit title </span>
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    {/* <Button onClick={handleEdit} variant="link">
              <PencilSquareIcon className="h-6 w-6 mr-2" />
              Edit title
            </Button> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </>
    )
  );
};

export default Title;
