import React, { useState, useContext } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "./CompetenciesContext";

const Templates = () => {
  const context = useContext(CompetenciesContext);
  const { templates, template, setTemplate } = context as CompetencyContextType;
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value);
    templates.forEach((t) => {
      if (t.slug.current === event.target.value) {
        setTemplate(t.competencies);
      }
    });
  };

  const clearAll = () => {
    setTemplate([]);
    setSelectedTemplate("default");
  };

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
      <span> or add your own competencies</span>
      {template.length > 0 && (
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      )}
    </div>
  );
};

export default Templates;
