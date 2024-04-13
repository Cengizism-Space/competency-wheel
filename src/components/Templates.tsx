import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  TemplateWithRandomCompetenciesType,
} from "../../typings";
import { randomizeCompetencies } from "@/utils";
import { fetchTemplates } from "../../sanity/client";

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
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4 text-left">
      {isLoading ? (
        <span className="text-gray-500 italic">Loading templates...</span>
      ) : (
        <>
          <p className="text-sm italic text-gray-600 leading-none">
            Choose a template
          </p>

          {templates.map((template: TemplateWithRandomCompetenciesType) => (
            <Link
              key={template.slug.current}
              className="items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
              href={`/wheel/${template.slug.current}`}
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
