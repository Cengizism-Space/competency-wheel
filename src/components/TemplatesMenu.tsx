import React, { useState, useContext, useEffect } from "react";
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

  return (
    <div className="competency-templates">
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
  );
};

export default TemplatesMenu;
