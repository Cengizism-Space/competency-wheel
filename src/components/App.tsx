"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  MutableRefObject,
  useRef,
} from "react";
import Wheel from "./Wheel/Wheel";
import Title from "./Title";
// import { CompetenciesContext } from "../context";
import { fetchWheel } from "@/sanity";
import { CompetencyType, WheelType } from "../../typings";
import { DEFAULT_TITLE, DEFAULT_WHEEL } from "@/constants";
import ResetButton from "./ResetButton";
import PNGExportButton from "./PNGExportButton";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import Link from "./Link";
import CompetencyValue from "./Competency/CompetencyValue";
import CompetencyMeta from "./Competency/CompetencyMeta";
import CompetencyRemoval from "./Competency/CompetencyRemoval";
import TemplatesMenu from "./TemplatesMenu";
import { fetchTemplates } from "@/sanity";
import { createContext } from "react";
// import { WheelType, CompetencyType } from "@/../typings";

export interface CompetencyContextType {
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  wheel: WheelType;
  setWheel: React.Dispatch<React.SetStateAction<WheelType>>;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  setTemplates: React.Dispatch<React.SetStateAction<WheelType[]>>;
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  savedLink: string | undefined;
  setSavedLink: React.Dispatch<React.SetStateAction<string | undefined>>;
  deleting: boolean;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  updateCompetency: (update: (competency: CompetencyType) => void) => void;
  reset: () => void;
}

export const CompetenciesContext = createContext<
  CompetencyContextType | undefined
>(undefined);

const App: React.FC<{ slug?: string | null }> = ({ slug }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [wheel, setWheel] = useState<WheelType>(DEFAULT_WHEEL);
  const [fetchedWheel, setFetchedWheel] = useState<WheelType | null>(null);
  const [templates, setTemplates] = useState<WheelType[]>([]);
  const [notFound, setNotFound] = useState(false);

  const [svgRef] = useState<MutableRefObject<SVGSVGElement | null>>(
    useRef<SVGSVGElement | null>(null)
  );
  const [saving, setSaving] = useState(false);
  const [savedLink, setSavedLink] = useState<string | undefined>(undefined);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      const templates = await fetchTemplates();
      setTemplates(templates);
    })();

    setSavedLink(undefined);
  }, []);

  useEffect(() => {
    if (wheel.hasOwnProperty("_id")) {
      setSavedLink(`${window.location.origin}/${wheel?.slug.current}`);
    }
  }, [wheel]);

  useEffect(() => {
    if (slug) {
      (async () => {
        const wheel = await fetchWheel(slug);
        if (wheel) {
          if (!wheel.competencies) {
            wheel.competencies = [];
          }

          setWheel(wheel);
          setFetchedWheel(wheel);
        } else {
          setNotFound(true);
        }
      })();
    }
  }, [slug]);

  const updateCompetency = useCallback(
    (update: (competency: CompetencyType) => void) => {
      if (activeIndex !== null) {
        const updatedCompetencies = [...wheel.competencies];
        update(updatedCompetencies[activeIndex]);
        setWheel({ ...wheel, competencies: updatedCompetencies });
      }
    },
    [activeIndex, wheel]
  );

  const reset = useCallback(() => {
    setWheel(DEFAULT_WHEEL);
    setActiveIndex(null);
    setSavedLink(undefined);
    setSaving(false);
    if (typeof window !== "undefined") {
      history.replaceState({}, "", `${window.location.origin}/`);
    }
  }, [setWheel, setActiveIndex]);

  const isUserEnteredWheel =
    wheel.title !== DEFAULT_TITLE || wheel.competencies.length > 0;
  const isWheelExportable =
    wheel.title.length > 0 &&
    wheel.competencies.length > 0 &&
    !saving &&
    !deleting;

  return (
    <CompetenciesContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        wheel,
        setWheel,
        fetchedWheel,
        templates,
        setTemplates,
        svgRef,
        saving,
        setSaving,
        savedLink,
        setSavedLink,
        deleting,
        setDeleting,
        updateCompetency,
        reset,
      }}
    >
      <div className="flex flex-col items-center space-y-4 mb-4">
        <Title />

        {notFound && <p>Wheel not found</p>}
        {saving && <p>Saving...</p>}
        {deleting && <p>Deleting...</p>}

        {savedLink && !saving && <Link />}

        <div className="flex flex-row items-center space-x-4 mr-4">
          <TemplatesMenu />
          <CompetencyMeta />
        </div>

        {activeIndex !== null && <CompetencyRemoval />}
        {activeIndex !== null && <CompetencyValue />}

        {isWheelExportable && (
          <div className="flex flex-row items-center space-x-4 mr-4">
            {isUserEnteredWheel && <ResetButton />}
            <PNGExportButton />
            <SaveButton />
            {savedLink && !deleting && <DeleteButton />}
          </div>
        )}

        <Wheel />
      </div>
    </CompetenciesContext.Provider>
  );
};

export default App;
