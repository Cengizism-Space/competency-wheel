import React, { useContext, useEffect, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  CompetencyType,
  TemplateWithRandomCompetenciesType,
} from "../../typings";
import { createSlug } from "@/utils";
import { fetchTemplates } from "../../sanity/sanity";

const TemplatesMenu = () => {
  const { templates, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType & {
    templates: TemplateWithRandomCompetenciesType[];
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAndSetTemplates = async () => {
      let fetchedTemplates: TemplateWithRandomCompetenciesType[] =
        await fetchTemplates();
      fetchedTemplates = fetchedTemplates.map((template) => ({
        ...template,
        randomCompetencies: getRandomCompetencies(template.competencies, 4)
          .map((c) => c.title)
          .join(", "),
      }));
      if (isMounted) {
        dispatch({
          type: "setState",
          payload: { templates: fetchedTemplates },
        });
      }
    };

    fetchAndSetTemplates();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const getTemplate = (slug: string) => {
    const t = templates.find((t) => t.slug.current === slug);
    if (t) {
      return t;
    }
  };

  const setTemplate = useCallback(
    (slug: string) => {
      const t = getTemplate(slug);

      if (t) {
        dispatch({
          type: "setState",
          payload: {
            isBootstrapped: true,
            wheel: {
              ...t,
              slug: {
                ...t.slug,
                current: createSlug(t.title),
              },
              competencies: t.competencies.map((competency) => ({
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

  const toggleBootstrapped = useCallback(() => {
    dispatch({ type: "setState", payload: { isBootstrapped: true } });
  }, [dispatch]);

  const getRandomCompetencies = (competencies: CompetencyType[], n: number) => {
    const toShuffle = [...competencies];
    const shuffled = toShuffle.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
      <button className="primary button" onClick={toggleBootstrapped}>
        Start Fresh
      </button>

      <span className="text-sm italic text-gray-600">or</span>

      <div className="flex flex-col gap-4 text-left">
        <p className="text-sm italic text-gray-600">Choose a template</p>

        {templates.map((template: TemplateWithRandomCompetenciesType) => (
          <button
            key={template.slug.current}
            className="secondary button"
            onClick={() => setTemplate(template.slug.current)}
          >
            <span className="text-lg">{template.title}</span>
            <span className="block text-gray-500 italic font-normal text-sm">
              {template.randomCompetencies} ...
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatesMenu;
