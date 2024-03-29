import React, { useState, useContext } from "react";
import {
  CompetenciesContext,
  CompetencyContextType,
} from "./CompetenciesContext";
import { DEFAULT_WHEEL } from "@/constants";  

const Templates = () => {
  const context = useContext(CompetenciesContext);
  const { templates, wheel, setWheel } = context as CompetencyContextType;
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value);
    templates.forEach((t) => {
      if (t.slug.current === event.target.value) {
        setWheel(t);
      }
    });
  };

  const clearAll = () => {
    setWheel(DEFAULT_WHEEL);
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
      {wheel.competencies.length > 0 && (
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      )}
    </div>
  );
};

export default Templates;
