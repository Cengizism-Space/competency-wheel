import React, { useState, useRef, FormEvent } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const Header = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Competency Chart");
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

  return (
    <div className="text-4xl font-bold text-center text-gray mb-12" ref={ref}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="border-b-2 border-gray-600"
          />
        </form>
      ) : (
        <h1 onClick={handleEdit}>
          {title}
          <button onClick={handleEdit} className="ml-2 underline text-blue-600">
            edit
          </button>
        </h1>
      )}
    </div>
  );
};

export default Header;
