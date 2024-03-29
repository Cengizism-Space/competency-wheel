import React, { useState, useRef, FormEvent, useContext } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "./CompetenciesContext";

const Header = () => {
  const { wheel, setWheel } = useContext(
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
    setWheel({ ...wheel, title: event.target.value });
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

export default Header;
