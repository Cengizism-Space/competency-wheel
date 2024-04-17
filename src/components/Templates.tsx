import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  TemplateWithRandomCompetenciesType,
} from "../../typings";
import { randomizeCompetencies } from "@/utils";
import { fetchTemplates } from "../../sanity/client";
import classNames from "classnames";

const Templates = () => {
  const { templates, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType & {
    templates: TemplateWithRandomCompetenciesType[];
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedTemplates: TemplateWithRandomCompetenciesType[] =
          await fetchTemplates();
        const randomizedTemplates = randomizeCompetencies(fetchedTemplates);

        dispatch({
          type: "setState",
          payload: { templates: randomizedTemplates },
        });
        setIsLoading(false);
      } catch (error) {
        dispatch({
          type: "setState",
          payload: {
            isErrored: true,
            errorMessage:
              "An error occurred while fetching the templates. Please try again later.",
          },
        });
      }
    })();
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <p className="flex items-center w-fit h-12 text-gray-500 italic">
          Loading templates...
        </p>
      ) : templates.length > 0 ? (
        <>
          <div className="flex flex-row gap-4">
            {templates.map(
              (template: TemplateWithRandomCompetenciesType, templateIdx) => (
                <Link
                  key={templateIdx}
                  className="flex flex-col relative overflow-hidden w-1/2 rounded-lg border border-gray-300 p-4 sm:p-6 lg:p-8 hover:bg-slate-100"
                  href={`/wheel/${template.slug.current}`}
                >
                  <span
                    className={classNames(
                      "absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r",
                      {
                        "from-green-300 via-blue-500 to-purple-600":
                          templateIdx === 0,
                        "from-yellow-300 via-red-500 to-pink-600":
                          templateIdx === 1,
                      }
                    )}
                  ></span>

                  <div className="flex justify-between gap-2 text-left">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {template.title}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-gray-600">
                        Generic template
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-left">
                    <p className="text-pretty text-sm text-gray-500">
                      {template.randomCompetencies} ...
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </>
      ) : null}
      <span className="text-xs italic text-gray-400">or</span>
    </div>
  );
};

export default Templates;
