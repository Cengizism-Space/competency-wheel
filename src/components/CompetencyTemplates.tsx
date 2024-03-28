import React, { useState, useContext } from "react";
import { CompetencyContext, CompetencyContextType } from "./CompetencyContext";
import { Templates } from "@/constants";

const CompetencyTemplates = () => {
  const context = useContext(CompetencyContext);
  const { template, setTemplate } = context as CompetencyContextType;
  const [selectedTemplate, setSelectedTemplate] = useState("default");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== "default") {
      setSelectedTemplate(event.target.value);
      setTemplate(Templates[event.target.value as keyof typeof Templates]);
    }
  };

  const clearAll = () => {
    setTemplate([]);
    setSelectedTemplate("default");
  };

  return (
    <div className="competency-templates">
      <select value={selectedTemplate} onChange={handleChange}>
        <option value="default">
          Choose a template to start or add your own competencies
        </option>
        <option value="ux">UX competencies template</option>
        <option value="frontend">Frontend competencies template</option>
      </select>
      {template.length > 0 && (
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      )}
    </div>
  );
};

export default CompetencyTemplates;
