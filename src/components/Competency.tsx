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
import Help from "./Help";

const Competency: React.FC = () => {
  const { wheel, activeIndex, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(5);
  const [improvement, setImprovement] = useState(false);
  const [error, setError] = useState("");
  const [isMaxAmountReached, setIsMaxAmountReached] = useState(false);

  const clearForm = useCallback(() => {
    setTitle("");
    setValue(5);
    setImprovement(false);
    setDescription("");
  }, []);

  useEffect(() => {
    if (activeIndex !== null) {
      const activeCompetency = wheel.competencies[activeIndex];
      if (activeCompetency) {
        setTitle(wheel.competencies[activeIndex].title);
        setValue(wheel.competencies[activeIndex].value);
        setImprovement(!!wheel.competencies[activeIndex].improvement);
        setDescription(wheel.competencies[activeIndex]?.description || "");
      }
    } else {
      /* istanbul ignore next */
      clearForm();
    }
  }, [activeIndex, wheel, clearForm]);

  useEffect(() => {
    setIsMaxAmountReached(wheel.competencies.length === 20);
  }, [wheel.competencies.length]);

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const trimmedTitle = event.target.value.trim();
      setTitle(trimmedTitle);

      if (trimmedTitle && wheel.competencies.length > 0) {
        /* istanbul ignore next */
        dispatch({
          type: "updateCompetency",
          payload: (competency: CompetencyType) => ({
            ...competency,
            title: trimmedTitle,
          }),
        });
      }
    },
    [wheel, dispatch]
  );

  const handleScaleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(event.target.value));

      if (wheel.competencies.length > 0) {
        /* istanbul ignore next */
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

  const handleScaleValueSteps = useCallback(
    (adjustment: number) => {
      if (activeIndex !== null) {
        /* istanbul ignore next */
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

  const handleDescriptionChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);

      if (wheel.competencies.length > 0) {
        /* istanbul ignore next */
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

  const handleImprovementToggle = useCallback(() => {
    setImprovement((prev) => !prev);

    if (wheel.competencies.length > 0) {
      /* istanbul ignore next */
      dispatch({
        type: "updateCompetency",
        payload: (competency: CompetencyType) => ({
          ...competency,
          improvement: !improvement,
        }),
      });
    }
  }, [wheel, dispatch, improvement]);

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
          <div className="flex flex-col gap-2">
            <InputField
              id="competencyTitle"
              dataTestId="competency-title-input"
              label="Title"
              placeholder="JavaScript, User research, ..."
              value={title}
              onChange={handleTitleChange}
            />

            {error && (
              <p
                className="italic text-sm text-red-500 leading-normal mb-4"
                data-testid="error-message"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Switch
              checked={improvement}
              onChange={handleImprovementToggle}
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
              onClick={handleImprovementToggle}
              variant="link"
              className="inline-flex"
              data-testid="improvement-button"
            >
              <div className="flex flex-row items-center gap-1">
                <RocketLaunchIcon className="w-4 h-4" />
                <span className="text-sm">Want to improve it more</span>
              </div>
            </Button>
          </div>

          <InputField
            id="competencyDescription"
            label="Description (Optional)"
            placeholder="Ability to write clean code, ..."
            value={description}
            onChange={handleDescriptionChange}
          />

          <div className="flex flex-row gap-4">
            <div className="w-24">
              <label
                htmlFor="competencyValue"
                className="text-left block overflow-hidden rounded-md border bg-white border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <span
                  data-testid="scale-of-label"
                  className="text-xs font-medium text-gray-700"
                >
                  Scale of
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    data-testid="decrease-value-button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={() => handleScaleValueSteps(-1)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    id="competencyValue"
                    data-testid="competency-value"
                    value={value}
                    onChange={handleScaleValueChange}
                    min={1}
                    max={10}
                    className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <button
                    type="button"
                    data-testid="increase-value-button"
                    className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={() => handleScaleValueSteps(1)}
                  >
                    +
                  </button>
                </div>
              </label>
            </div>

            <Help />
          </div>

          <Button
            type="submit"
            onClick={handleCompetencyAddOrUpdate}
            data-testid="competency-submit-button"
            disabled={isMaxAmountReached && activeIndex === null}
          >
            {activeIndex !== null ? "Update" : "Add"}
          </Button>
        </form>

        {isMaxAmountReached && (
          <p
            data-testid="max-amount-reached-info"
            className="italic text-sm text-red-500 leading-normal"
          >
            Max amount of competencies reached. Remove some if you want to add
            new ones.
          </p>
        )}
      </div>
    </div>
  );
};

export default Competency;
