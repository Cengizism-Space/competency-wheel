import React, { useState, useRef, FormEvent, useContext } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import { CompetenciesContext } from "../context";
import { createSlug } from "@/utils";

const Title = () => {
  const context = useContext(CompetenciesContext);
  if (!context) {
    throw new Error("Component must be used within a CompetenciesProvider");
  }
  const { wheel, dispatch } = context;

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
    <div className="text-4xl font-bold text-center text-gray mb-12" ref={ref}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            value={wheel.title}
            onChange={handleTitleChange}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="border-b-2 border-gray-600"
          />
        </form>
      ) : (
        <h1 onClick={handleEdit}>
          {wheel.title}
          <button onClick={handleEdit} className="ml-2 underline text-blue-600">
            edit
          </button>
        </h1>
      )}
    </div>
  );
};

export default Title;
