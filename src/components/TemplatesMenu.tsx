import React, { useState, useContext, useEffect, useCallback } from "react";
import { CompetenciesContext } from "@/context";
import { CompetencyContextType } from "../../typings";
import { createSlug } from "@/utils";
import { fetchTemplates } from "../../sanity/sanity";

const TemplatesMenu = () => {
  const { wheel, templates, dispatch } = useContext(
    CompetenciesContext
  ) as CompetencyContextType;

  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value);
    templates.forEach((t) => {
      if (t.slug.current === event.target.value) {
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
      }
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAndSetTemplates = async () => {
      const templates = await fetchTemplates();
      if (isMounted) {
        dispatch({ type: "setState", payload: { templates: templates } });
      }
    };

    fetchAndSetTemplates();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (wheel && wheel.competencies.length > 0) {
      setSelectedTemplate("default");
    }
  }, [wheel]);

  const toggleBootstrapped = useCallback(() => {
    dispatch({ type: "setState", payload: { isBootstrapped: true } });
  }, [dispatch]);

  return (
    <div className="competency-templates">
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        <button
          className="block w-full rounded bg-red-600 px-12 py-3 text-lg font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          onClick={toggleBootstrapped}
        >
          Start Fresh
        </button>

        <span className="text-sm italic text-gray-600">or</span>

        <div className="text-left">
          <p className="mb-4">
            <span className="text-sm italic text-gray-600">
              Choose a template
            </span>
          </p>

          <button className="mb-4 block w-full rounded px-6 py-4 text-left font-medium bg-white text-gray-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
            <span className="text-lg">User Experience Designer</span>
            <span className="block text-gray-500 italic font-normal text-sm">
              User Research, Wireframing, Prototyping, ...
            </span>
          </button>

          <button className="block w-full rounded px-6 py-4 text-left font-medium bg-white text-gray-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto">
            <span className="text-lg">Frontend Developer</span>
            <span className="block text-gray-500 italic font-normal text-sm">
              TypeScript, React, TailwindCSS, Next.js, ...
            </span>
          </button>

          <select value={selectedTemplate} onChange={handleChange}>
            {selectedTemplate === "default" && (
              <option value="default">Select a template</option>
            )}
            {templates.map((t) => (
              <option key={t.slug.current} value={t.slug.current}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TemplatesMenu;
