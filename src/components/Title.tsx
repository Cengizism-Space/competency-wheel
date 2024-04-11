import React, { useState, useRef, FormEvent, useContext } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { createSlug } from "@/utils";
import { PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

const Title = () => {
  const { wheel, isFound, isEditing, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => {
    if (isEditingTitle) {
      setIsEditingTitle(false);
    }
  });

  const handleEdit = () => {
    if (isEditing) {
      setIsEditingTitle(true);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsEditingTitle(false);
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
          <div className="mx-auto pt-12 pb-0">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div
                className="mt-4 flex flex-col gap-8 sm:mt-0 sm:flex-row sm:items-center text-center"
                ref={ref}
              >
                {isEditingTitle ? (
                  <form className="flex items-center" onSubmit={handleSubmit}>
                    <input
                      value={wheel.title}
                      onChange={handleTitleChange}
                      onBlur={() => setIsEditingTitle(false)}
                      autoFocus
                      className="w-fit justify-center text-center text-3xl font-bold sm:text-5xl text-gray-600 mr-8 bg-transparent focus:outline-none focus:ring-0 line-height-1 border-b border-gray-300"
                    />
                    <Button type="submit" variant="link">
                      <CheckIcon className="h-4 w-4" />
                      <span className="text-sm font-medium"> Save title </span>
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-row items-center gap-8">
                    <h1
                      className="inline-flex text-3xl font-bold sm:text-5xl text-gray-600"
                      onClick={handleEdit}
                    >
                      {wheel.title}
                    </h1>
                    {isEditing && (
                      <Button onClick={handleEdit} variant="link">
                        <PencilSquareIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {" "}
                          Edit title{" "}
                        </span>
                      </Button>
                    )}
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
