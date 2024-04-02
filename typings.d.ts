export type State = {
  activeIndex: number | null;
  wheel: WheelType;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  savedLink: string | undefined;
};

export type Action =
  | { type: 'setState'; payload: Partial<State> }
  | { type: 'updateCompetency'; payload: (competency: CompetencyType) => number }
  | { type: 'reset' };

export interface CompetencyContextType {
  activeIndex: number | null;
  wheel: WheelType;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  savedLink: string | undefined;
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

export interface ShareData {
  title: string;
  text: string;
  url: string;
}