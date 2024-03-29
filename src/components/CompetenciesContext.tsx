import { createContext, useState, FC, ReactNode } from "react";
import { WheelType } from "@/../typings";
import { DEFAULT_WHEEL } from "@/constants";

export interface CompetencyContextType {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  wheel: WheelType;
  setWheel: React.Dispatch<React.SetStateAction<WheelType>>;
  templates: WheelType[];
  setTemplates: React.Dispatch<React.SetStateAction<WheelType[]>>;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

export const CompetenciesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [wheel, setWheel] = useState<WheelType>(DEFAULT_WHEEL);
  const [templates, setTemplates] = useState<WheelType[]>([]);

  return (
    <CompetenciesContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        wheel,
        setWheel,
        templates,
        setTemplates,
      }}
    >
      {children}
    </CompetenciesContext.Provider>
  );
};
