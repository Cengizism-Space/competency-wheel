import { WheelType } from "../typings";

export type State = {
  activeIndex: number | null;
  wheel: WheelType;
  fetchedWheel: WheelType | null;
  templates: WheelType[];
  svgRef: React.MutableRefObject<SVGSVGElement | null>;
  saving: boolean;
  savedLink: string | undefined;
  deleting: boolean;
};

export type Action =
  | { type: 'setActiveIndex'; payload: number | null }
  | { type: 'setWheel'; payload: WheelType }
  | { type: 'setFetchedWheel'; payload: WheelType | null }
  | { type: 'setTemplates'; payload: WheelType[] }
  | { type: 'setSvgRef'; payload: React.MutableRefObject<SVGSVGElement | null> }
  | { type: 'setSaving'; payload: boolean }
  | { type: 'setSavedLink'; payload: string | undefined }
  | { type: 'setDeleting'; payload: boolean };

export const CompetenciesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setActiveIndex':
      return { ...state, activeIndex: action.payload };
    case 'setWheel':
      return { ...state, wheel: action.payload };
    case 'setFetchedWheel':
      return { ...state, fetchedWheel: action.payload };
    case 'setTemplates':
      return { ...state, templates: action.payload };
    case 'setSvgRef':
      return { ...state, svgRef: action.payload };
    case 'setSaving':
      return { ...state, saving: action.payload };
    case 'setSavedLink':
      return { ...state, savedLink: action.payload };
    case 'setDeleting':
      return { ...state, deleting: action.payload };
    default:
      throw new Error();
  }
}