import React, { useContext, useEffect, useCallback, useState } from "react";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  TemplateWithRandomCompetenciesType,
} from "../../typings";
import { createSlug } from "@/utils";
import { fetchTemplates } from "../../sanity/sanity";

const Landing = () => {
  const { templates, isBootstrapped, link, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType & {
    templates: TemplateWithRandomCompetenciesType[];
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localTemplates = localStorage.getItem("templates");

    if (localTemplates) {
      const parsedTemplates = JSON.parse(localTemplates);
      dispatch({
        type: "setState",
        payload: { templates: parsedTemplates },
      });
      setIsLoading(false);
    }

    fetchAndSetTemplates();
  }, [dispatch, isBootstrapped]);

  const randomizeCompetencies = useCallback(
    (templates: TemplateWithRandomCompetenciesType[]) => {
      return templates.map((template) => {
        const toShuffle = [...template.competencies];
        const shuffled = toShuffle.sort(() => 0.5 - Math.random());
        const selected = shuffled
          .slice(0, 4)
          .map((c) => c.title)
          .join(", ");
        return {
          ...template,
          randomCompetencies: selected,
        };
      });
    },
    []
  );

  const fetchAndSetTemplates = useCallback(async () => {
    const fetchedTemplates: TemplateWithRandomCompetenciesType[] =
      await fetchTemplates();
    const randomizedTemplates = randomizeCompetencies(fetchedTemplates);
    dispatch({
      type: "setState",
      payload: { templates: randomizedTemplates },
    });
    localStorage.setItem("templates", JSON.stringify(randomizedTemplates));
    setIsLoading(false);
  }, [dispatch, randomizeCompetencies]);

  const getTemplate = useCallback(
    (slug: string) => {
      const template = templates.find((t) => t.slug.current === slug);
      if (template) {
        return template;
      }
    },
    [templates]
  );

  const setTemplate = useCallback(
    (slug: string) => {
      const template = getTemplate(slug);

      if (template) {
        dispatch({
          type: "setState",
          payload: {
            isBootstrapped: true,
            wheel: {
              ...template,
              slug: {
                ...template.slug,
                current: createSlug(template.title),
              },
              competencies: template.competencies.map((competency) => ({
                ...competency,
              })),
            },
          },
        });
      } else {
        console.error(`Template with slug ${slug} not found.`);
      }
    },
    [dispatch, getTemplate]
  );

  const handleSetTemplate = useCallback(
    (slug: string) => {
      setTemplate(slug);
    },
    [setTemplate]
  );

  const toggleBootstrapped = useCallback(() => {
    dispatch({ type: "setState", payload: { isBootstrapped: true } });
  }, [dispatch]);

  return (
    !isBootstrapped &&
    !link && (
      <div className="col-span-12 mt-6 flex flex-wrap items-center justify-center gap-8">
        <button className="primary button" onClick={toggleBootstrapped}>
          Start Fresh
        </button>
        <span className="text-sm italic text-gray-600">or</span>
        <div className="flex flex-col gap-4 text-left">
          {isLoading ? (
            <div>Loading templates...</div>
          ) : (
            <>
              <p className="text-sm italic text-gray-600">Choose a template</p>
              {templates.map((template: TemplateWithRandomCompetenciesType) => (
                <button
                  key={template.slug.current}
                  className="secondary button"
                  onClick={() => handleSetTemplate(template.slug.current)}
                >
                  <span className="text-lg">{template.title}</span>
                  <span className="block text-gray-500 italic font-normal text-sm">
                    {template.randomCompetencies} ...
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Landing;
