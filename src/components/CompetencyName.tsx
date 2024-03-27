import { CompetencyType } from "@/constants";
import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";

interface CompetencyNameProps {
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
}

const CompetencyName: React.FC<CompetencyNameProps> = ({
  updateCompetency,
}) => {
  const context = useContext(CompetencyContext);
  const { competencies, setCompetencies, activeIndex } =
    context as CompetencyContextType;

  useEffect(() => {
    if (activeIndex !== null) {
      setInputValue(competencies[activeIndex].name);
    } else {
      setInputValue("");
    }
  }, [activeIndex]);

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleAdd = useCallback(() => {
    if (inputValue && competencies.length < 20) {
      setCompetencies([...competencies, { name: inputValue, value: 5 }]);
      setInputValue("");
    }
  }, [inputValue, competencies, setCompetencies]);

  const handleSave = useCallback(() => {
    if (!inputValue.trim()) {
      setError("Competency name cannot be empty");
      return;
    }

    setError("");

    if (activeIndex !== null) {
      updateCompetency((competency) => (competency.name = inputValue));
    } else if (inputValue) {
      handleAdd();
    }
  }, [inputValue, activeIndex, updateCompetency, handleAdd]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border-2 border-gray-300 rounded-md p-2"
      />
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

export default CompetencyName;
