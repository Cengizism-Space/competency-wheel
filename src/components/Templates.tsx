import React, { Fragment, useContext, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";
import { CompetenciesContext } from "@/context";
import {
  CompetencyContextType,
  TemplateWithRandomCompetenciesType,
} from "../../typings";
import { randomizeCompetencies } from "@/utils";
import { fetchTemplates } from "../../sanity/client";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
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
    <div className="flex flex-col gap-4 text-left items-center">
      {isLoading ? (
        <span className="text-gray-500 italic">Loading templates...</span>
      ) : templates.length > 0 ? (
        <>
          <Listbox>
            <div className="relative mt-1 w-80">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm hover:cursor-pointer">
                <span className="block truncate text-gray-500">
                  Choose a template
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {templates.map(
                    (
                      template: TemplateWithRandomCompetenciesType,
                      templateIdx
                    ) => (
                      <Listbox.Option
                        key={templateIdx}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-default select-none py-2 pl-3 pr-4 hover:cursor-pointer",
                            {
                              "bg-slate-100 text-gray-600": active,
                              "text-gray-500": !active,
                            }
                          )
                        }
                        value={template}
                      >
                        <Link href={`/wheel/${template.slug.current}`}>
                          <p className="truncate">
                            <span className="block text-lg">
                              {template.title}
                            </span>
                            {template.randomCompetencies} ...
                          </p>
                        </Link>
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <span className="text-xs italic text-gray-600">or</span>
        </>
      ) : null}
    </div>
  );
};

export default Templates;
