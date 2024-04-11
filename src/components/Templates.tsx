import React, { useContext, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  TemplateWithRandomCompetenciesType,
} from "../../typings";
import { createSlug, randomizeCompetencies } from "@/utils";
import { fetchTemplates } from "../../sanity/sanity";

const Templates = () => {
  const { templates, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType & {
    templates: TemplateWithRandomCompetenciesType[];
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedTemplates: TemplateWithRandomCompetenciesType[] =
        await fetchTemplates();
      const randomizedTemplates = randomizeCompetencies(fetchedTemplates);

      dispatch({
        type: "setState",
        payload: { templates: randomizedTemplates },
      });
      setIsLoading(false);
    })();
  }, []);

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

  return (
    <div className="flex flex-col gap-4 text-left">
      {isLoading ? (
        <div>Loading templates...</div>
      ) : (
        <>
          <p className="text-sm italic text-gray-600 leading-none">Choose a template</p>
          {templates.map((template: TemplateWithRandomCompetenciesType) => (
            <Link
              key={template.slug.current}
              className="items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
              href={`/wheel/${template.slug.current}`}
              onClick={() => handleSetTemplate(template.slug.current)}
            >
              <p className="text-lg">{template.title}</p>
              <p className="text-gray-500 italic font-normal text-sm">
                {template.randomCompetencies} ...
              </p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Templates;
