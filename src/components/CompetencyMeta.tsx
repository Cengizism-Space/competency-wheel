import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../typings";

const CompetencyMeta: React.FC = () => {
  const { wheel, activeIndex, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [description, setDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeIndex !== null) {
      setInputValue(wheel.competencies[activeIndex].title);
      setDescription(wheel.competencies[activeIndex]?.description || "");
    } else {
      setInputValue("");
      setDescription("");
    }
  }, [activeIndex, wheel]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value),
    []
  );

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setDescription(() => event.target.value),
    []
  );

  const clearMetaForm = useCallback(() => {
    setInputValue("");
    setDescription("");
  }, []);

  const handleSave = useCallback(() => {
    if (!inputValue.trim()) {
      setError("Competency name cannot be empty");
      return;
    }
    setError("");

    if (activeIndex !== null) {
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) => ({
          ...competency,
          title: inputValue,
          description: description,
        }),
      });

      clearMetaForm();
      dispatch({ type: "setState", payload: { activeIndex: null } });
    } else if (inputValue && wheel.competencies.length < 20) {
      dispatch({
        type: "setState",
        payload: {
          wheel: {
            ...wheel,
            competencies: [
              ...wheel.competencies,
              {
                title: inputValue,
                description,
                value: 5,
              },
            ],
          },
        },
      });
      clearMetaForm();
    }
  }, [inputValue, description, activeIndex, wheel, clearMetaForm, dispatch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
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
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>

      <label
        htmlFor="competencyDescription"
        className="block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
      >
        <span className="text-xs font-medium text-gray-700"> Description </span>

        <input
          type="text"
          id="competencyDescription"
          placeholder="Ability to write clean code, ..."
          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>

      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {activeIndex !== null ? "Update" : "Add new"}
      </button>
    </form>
  );
};

export default CompetencyMeta;
