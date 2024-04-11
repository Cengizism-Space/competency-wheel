export type State = {
  activeIndex: number | null;
  activeLabelCoords: { x: number; y: number } | null;
  wheel: WheelType;
  initialWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  link: string | undefined;
  isFound: boolean;
  isExportable: boolean;
  isInitial: boolean;
  isEditing: boolean;
  isEmpty: boolean;
};

export type Action =
  | { type: 'setState'; payload: Partial<State> }
  | { type: 'updateCompetency'; payload: (competency: CompetencyType) => CompetencyType }
  | { type: 'reset' };

export interface CompetencyContextType {
  activeIndex: number | null;
  activeLabelCoords: { x: number; y: number } | null;
  wheel: WheelType;
  initialWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  link: string | undefined;
  isFound: boolean;
  isExportable: boolean;
  isInitial: boolean;
  isEditing: boolean;
  isEmpty: boolean;
  dispatch: React.Dispatch<any>;
}

type SanityBase = {
  _id?: string;
  _rev?: string;
  _key?: string;
  _type?: string;
  publishedAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
};

export type CompetencyType = {
  title: string;
  description: string;
  value: number;
} & SanityBase;

export type WheelType = {
  title: string;
  template?: boolean;
  slug: {
    _type: "slug";
    current: string;
  };
  competencies: CompetencyType[];
} & SanityBase;

export type TemplateWithRandomCompetenciesType = WheelType & {
  randomCompetencies: string;
};

export interface ShareData {
  title: string;
  text: string;
  url: string;
}