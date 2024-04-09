import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../../../typings";
import InputField from "@/components/Commons/InputField";
import Button from "@/components/Commons/Button";
import { CheckIcon } from "@heroicons/react/24/outline";

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
      <InputField
        id="competencyTitle"
        label="Title"
        placeholder="JavaScript, User research, ..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <InputField
        id="competencyDescription"
        label="Description"
        placeholder="Ability to write clean code, ..."
        value={description}
        onChange={handleDescriptionChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button onClick={handleSave}>
        <CheckIcon className="h-6 w-6 mr-2" />
        {activeIndex !== null ? "Update" : "Add new"}
      </Button>
    </form>
  );
};

export default CompetencyMeta;
