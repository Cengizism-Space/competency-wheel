import React, { useState, ChangeEvent } from "react";
import { CompetencyType } from "../constants";

interface CompetencyControllerProps {
  competencies: CompetencyType[];
  setCompetencies: React.Dispatch<React.SetStateAction<CompetencyType[]>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const CompetencyController: React.FC<CompetencyControllerProps> = ({
  competencies,
  setCompetencies,
  activeIndex,
  setActiveIndex,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleIncrease = () => {
    if (activeIndex !== null) {
      const updatedCompetencies = [...competencies];
      updatedCompetencies[activeIndex].value++;
      setCompetencies(updatedCompetencies);
    }
  };

  const handleDecrease = () => {
    if (activeIndex !== null) {
      const updatedCompetencies = [...competencies];
      updatedCompetencies[activeIndex].value--;
      setCompetencies(updatedCompetencies);
    }
  };

  const handleAdd = () => {
    if (inputValue) {
      setCompetencies([...competencies, { name: inputValue, value: 5 }]);
      setInputValue("");
    }
  };

  const handleRemove = () => {
    if (activeIndex !== null) {
      const updatedCompetencies = competencies.filter(
        (_, index) => index !== activeIndex
      );
      setCompetencies(updatedCompetencies);
      setActiveIndex(null);
    }
  };

  return (
    <div className="flex flex-rows items-center space-y-4 mb-8">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="border-2 border-gray-300 rounded-md p-2"
      />
      {activeIndex === null ? (
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Competency
        </button>
      ) : (
        <>
          <button
            onClick={handleIncrease}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Increase
          </button>
          <button
            onClick={handleDecrease}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Decrease
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Remove Competency
          </button>
        </>
      )}
    </div>
  );
};

export default CompetencyController;
