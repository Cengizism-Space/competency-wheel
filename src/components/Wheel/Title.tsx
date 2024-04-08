import React, { useState, useRef, FormEvent, useContext } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../../typings";
import { createSlug } from "@/utils";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
      <div
        className="relative flex flex-row justify-center items-center"
        ref={ref}
      >
        <div className="absolute inset-x-0 top-28 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

        {isEditing ? (
          <form
            className="flex flex-row items-center h-32"
            onSubmit={handleSubmit}
          >
            <input
              value={wheel.title}
              onChange={handleTitleChange}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="text-3xl font-bold sm:text-5xl text-gray-600 mr-8 bg-transparent focus:outline-none focus:ring-0 line-height-1"
            />
            <button className="flex flex-row items-center text-gray-500 hover:text-red-700">
              <PencilSquareIcon className="h-6 w-6 mr-2" />
              Save title
            </button>
          </form>
        ) : (
          <div className="flex flex-row items-center h-32">
            <h1
              className="text-3xl font-bold sm:text-5xl text-gray-600 mr-8"
              onClick={handleEdit}
            >
              {wheel.title}
            </h1>
            <button
              className="flex flex-row items-center text-gray-500 hover:text-red-700"
              onClick={handleEdit}
            >
              <PencilSquareIcon className="h-6 w-6 mr-2" />
              Edit title
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default Title;
