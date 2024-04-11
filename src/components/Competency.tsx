import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../typings";
import InputField from "@/components/commons/InputField";
import Button from "@/components/commons/Button";

const Competency: React.FC = () => {
  const { wheel, activeIndex, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeIndex !== null) {
      setTitle(wheel.competencies[activeIndex].title);
      setValue(wheel.competencies[activeIndex].value);
      setDescription(wheel.competencies[activeIndex]?.description || "");
    } else {
      setTitle("");
      setValue(5);
      setDescription("");
    }
  }, [activeIndex, wheel]);

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
    []
  );

  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(event.target.value));

      if (wheel.competencies.length > 0) {
        dispatch({
          type: "updateCompetency",
          payload: (competency: CompetencyType) => ({
            ...competency,
            value: Number(event.target.value),
          }),
        });
      }
    },
    [wheel, dispatch]
  );

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setDescription(() => event.target.value),
    []
  );

  const clearMetaForm = useCallback(() => {
    setTitle("");
    setValue(5);
    setDescription("");
  }, []);

  const handleSave = useCallback(() => {
    if (!title.trim()) {
      setError("Competency name cannot be empty");
      return;
    }
    setError("");

    if (activeIndex !== null) {
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) => ({
          ...competency,
          title,
          description,
        }),
      });

      clearMetaForm();
      dispatch({ type: "setState", payload: { activeIndex: null } });
    } else if (title && wheel.competencies.length < 20) {
      dispatch({
        type: "setState",
        payload: {
          wheel: {
            ...wheel,
            competencies: [
              ...wheel.competencies,
              {
                title,
                description,
                value: value || 5,
              },
            ],
          },
        },
      });
      clearMetaForm();
    }
  }, [title, value, description, activeIndex, wheel, clearMetaForm, dispatch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
      <InputField
        id="competencyTitle"
        label="Title"
        placeholder="JavaScript, User research, ..."
        value={title}
        onChange={handleTitleChange}
      />
      {error && (
        <p className="text-sm text-red-500 leading-none mb-4">{error}</p>
      )}

      <InputField
        id="competencyValue"
        label="Value"
        placeholder="5"
        value={value}
        onChange={handleValueChange}
        type="number"
        min={1}
        max={10}
      />

      <InputField
        id="competencyDescription"
        label="Description (Optional)"
        placeholder="Ability to write clean code, ..."
        value={description}
        onChange={handleDescriptionChange}
      />

      <Button type="submit" onClick={handleSave}>
        {activeIndex !== null ? "Update" : "Add new"}
      </Button>
    </form>
  );
};

export default Competency;
