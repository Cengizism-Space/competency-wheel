import React, { useState, useRef, FormEvent, useContext } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { createSlug } from "@/utils";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Title = () => {
  const { wheel, isBootstrapped, dispatch } = useContext(
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

  return isBootstrapped ? (
    <div className="flex flex-row justify-center items-center" ref={ref}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            value={wheel.title}
            onChange={handleTitleChange}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="text-3xl font-bold sm:text-5xl text-gray-600 mr-8 bg-transparent focus:outline-none focus:ring-0 border-b border-gray-600"
          />
        </form>
      ) : (
        <>
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
        </>
      )}
    </div>
  ) : (
    <div className="mb-10">
      <h1 className="text-3xl font-bold sm:text-5xl mb-4 text-gray-600">
        Create your own
        <strong className="font-extrabold text-red-700 sm:block mt-2">
          Competency Wheel
        </strong>
      </h1>

      <p className="mt-8 sm:text-xl/relaxed max-w-xl text-center mx-auto">
        You can use this tool to create your own competency wheel. It is a great
        way to visualize your skills and competencies.
      </p>
    </div>
  );
};

export default Title;
