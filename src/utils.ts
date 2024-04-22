import slugify from 'slugify';
import { TemplateWithRandomCompetenciesType, WheelType } from '../typings';
import { isEqual } from "lodash";

export const createSlug = (input: string): string => {
  const now = Math.floor(Date.now() / 1000);
  const slug = slugify(input, {
    lower: true,
    strict: true,
    replacement: '-',
  });
  return `${now}-${slug}`;
}

export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const randomizeCompetencies = (templates: TemplateWithRandomCompetenciesType[]) => {
  return templates.map((template) => {
    const toShuffle = [...template.competencies];
    const shuffled = toShuffle.sort(() => 0.5 - Math.random());
    const selected = shuffled
      .slice(0, 3)
      .map((c) => c.title)
      .join(", ");
    return {
      ...template,
      randomCompetencies: selected,
    };
  });
};

export function defineWheelStates(wheel: WheelType, initialWheel: WheelType | null) {
  const isExportable = wheel.title.length > 0 && wheel.competencies.length > 0;
  const isInitial = isEqual(wheel, initialWheel);
  const isEmpty = wheel.competencies.length === 0;

  return { isExportable, isInitial, isEmpty };
}