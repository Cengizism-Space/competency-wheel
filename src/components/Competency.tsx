import React, {
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyType, CompetencyContextType } from "../../typings";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

const Competency: React.FC = () => {
  const { wheel, activeIndex, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(5);
  const [improvement, setImprovement] = useState(false);
  const [error, setError] = useState("");
  const [hasDescription, setHasDescription] = useState(false);

  useEffect(() => {
    if (activeIndex !== null) {
      setTitle(wheel.competencies[activeIndex].title);
      setValue(wheel.competencies[activeIndex].value);
      setImprovement(!!wheel.competencies[activeIndex].improvement);
      setDescription(wheel.competencies[activeIndex]?.description || "");
      setHasDescription(!!wheel.competencies[activeIndex]?.description);
    } else {
      setTitle("");
      setValue(5);
      setImprovement(false);
      setDescription("");
      setHasDescription(false);
    }
  }, [activeIndex, wheel]);

  const handleCompetencyTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
    []
  );

  const handleCompetencyValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(event.target.value));

      if (wheel.competencies.length > 0) {
        dispatch({
          type: "updateCompetency",
          payload: (competency: CompetencyType) => ({
            ...competency,
            title,
            description,
            value: Number(event.target.value),
            improvement,
          }),
        });
      }
    },
    [wheel, dispatch, title, description, improvement]
  );

  const handleCompetencyDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setDescription(() => event.target.value),
    []
  );

  const clearForm = useCallback(() => {
    setTitle("");
    setValue(5);
    setImprovement(false);
    setDescription("");
  }, []);

  const handleCompetencyAddOrUpdate = useCallback(() => {
    if (!title.trim()) {
      setError("Competency name cannot be empty");
      return;
    }
    setError("");

    let payload = {};
    if (activeIndex !== null) {
      payload = {
        type: "updateCompetency",
        payload: (competency: CompetencyType) => ({
          ...competency,
          title,
          description,
          value,
          improvement,
        }),
      };
    } else if (wheel.competencies.length < 20) {
      payload = {
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
                improvement,
              },
            ],
          },
        },
      };
    }

    if (Object.keys(payload).length > 0) {
      dispatch(payload);

      clearForm();
      if (activeIndex !== null) {
        dispatch({ type: "setState", payload: { activeIndex: null } });
      }
    }
  }, [
    title,
    value,
    improvement,
    description,
    activeIndex,
    wheel,
    clearForm,
    dispatch,
  ]);

  return (
    <div className="flex flex-col gap-16 w-full text-slate-600">
      <div className="w-full flex flex-col gap-4 rounded px-8 py-6">
        <p className="text-lg font-medium text-left">Competency</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          <InputField
            id="competencyTitle"
            label="Title"
            placeholder="JavaScript, User research, ..."
            value={title}
            onChange={handleCompetencyTitleChange}
          />
          {error && (
            <p className="text-sm text-red-500 leading-none mb-4">{error}</p>
          )}

          <InputField
            id="competencyValue"
            label="Value"
            placeholder="5"
            value={value}
            onChange={handleCompetencyValueChange}
            type="number"
            min={1}
            max={10}
          />

          <div className="flex flex-row gap-2 items-center">
            <Switch
              checked={improvement}
              onChange={setImprovement}
              as={Fragment}
            >
              {({ checked }) => (
                <button
                  className={classNames(
                    "relative inline-flex h-6 w-11 items-center rounded-full",
                    {
                      "bg-blue-600": checked,
                      "bg-gray-200": !checked,
                    }
                  )}
                >
                  <span
                    className={classNames(
                      "inline-block w-4 h-4 transform bg-white rounded-full transition",
                      {
                        "translate-x-6": checked,
                        "translate-x-1": !checked,
                      }
                    )}
                  />
                </button>
              )}
            </Switch>
            <Button
              onClick={() => setImprovement(!improvement)}
              variant="link"
              className="inline-flex"
            >
              <div className="flex flex-row items-center gap-1">
                <RocketLaunchIcon className="w-5 h-5" />
                <span className="text-sm">Mark as to be improved</span>
              </div>
            </Button>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Switch
              checked={hasDescription}
              onChange={setHasDescription}
              as={Fragment}
            >
              {({ checked }) => (
                <button
                  className={classNames(
                    "relative inline-flex h-6 w-11 items-center rounded-full",
                    {
                      "bg-blue-600": checked,
                      "bg-gray-200": !checked,
                    }
                  )}
                >
                  <span
                    className={classNames(
                      "inline-block w-4 h-4 transform bg-white rounded-full transition",
                      {
                        "translate-x-6": checked,
                        "translate-x-1": !checked,
                      }
                    )}
                  />
                </button>
              )}
            </Switch>

            <Button
              onClick={() => setHasDescription(!hasDescription)}
              variant="link"
              className="inline-flex"
            >
              <span className="text-sm">Has a description</span>
            </Button>
          </div>

          {hasDescription && (
            <InputField
              id="competencyDescription"
              label="Description (Optional)"
              placeholder="Ability to write clean code, ..."
              value={description}
              onChange={handleCompetencyDescriptionChange}
            />
          )}

          <Button type="submit" onClick={handleCompetencyAddOrUpdate}>
            {activeIndex !== null ? "Update" : "Add"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Competency;
