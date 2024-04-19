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

  useEffect(() => {
    if (activeIndex !== null) {
      setTitle(wheel.competencies[activeIndex].title);
      setValue(wheel.competencies[activeIndex].value);
      setImprovement(!!wheel.competencies[activeIndex].improvement);
      setDescription(wheel.competencies[activeIndex]?.description || "");
    } else {
      setTitle("");
      setValue(5);
      setImprovement(false);
      setDescription("");
    }
  }, [activeIndex, wheel]);

  const handleCompetencyTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);

      if (wheel.competencies.length > 0) {
        dispatch({
          type: "updateCompetency",
          payload: (competency: CompetencyType) => ({
            ...competency,
            title: event.target.value,
          }),
        });
      }
    },
    [wheel, dispatch]
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

  const handleCompetencyValueAdjust = useCallback(
    (adjustment: number) => {
      if (activeIndex !== null) {
        dispatch({
          type: "updateCompetency",
          payload: (competency: CompetencyType) => ({
            ...competency,
            value: Math.min(10, Math.max(1, competency.value + adjustment)),
          }),
        });
      } else {
        setValue((prevValue) =>
          Math.min(10, Math.max(1, prevValue + adjustment))
        );
      }
    },
    [dispatch, activeIndex]
  );

  const handleCompetencyDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);

      if (wheel.competencies.length > 0) {
        dispatch({
          type: "updateCompetency",
          payload: (competency: CompetencyType) => ({
            ...competency,
            description: event.target.value,
          }),
        });
      }
    },
    [wheel, dispatch]
  );

  const clearForm = useCallback(() => {
    setTitle("");
    setValue(5);
    setImprovement(false);
    setDescription("");
  }, []);

  // TODO: Some funtions are reduntant, but I'm keeping them for now
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
        <p className="text-lg font-medium text-left">
          {activeIndex !== null ? `Competency` : `New competency`}
        </p>

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
            id="competencyDescription"
            label="Description (Optional)"
            placeholder="Ability to write clean code, ..."
            value={description}
            onChange={handleCompetencyDescriptionChange}
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
                <RocketLaunchIcon className="w-4 h-4" />
                <span className="text-sm">Want to improve</span>
              </div>
            </Button>
          </div>

          <div className="w-24">
            <label
              htmlFor="competencyValue"
              className="text-left block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <span className="text-xs font-medium text-gray-700">
                Scale of
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={() => handleCompetencyValueAdjust(-1)}
                >
                  -
                </button>

                <input
                  type="number"
                  id="competencyValue"
                  value={value}
                  onChange={handleCompetencyValueChange}
                  min={1}
                  max={10}
                  className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                  onClick={() => handleCompetencyValueAdjust(1)}
                >
                  +
                </button>
              </div>
            </label>
          </div>

          <Button type="submit" onClick={handleCompetencyAddOrUpdate}>
            {activeIndex !== null ? "Update" : "Add"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Competency;
