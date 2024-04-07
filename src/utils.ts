import slugify from 'slugify';
import { TemplateWithRandomCompetenciesType } from '../typings';

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
      .slice(0, 4)
      .map((c) => c.title)
      .join(", ");
    return {
      ...template,
      randomCompetencies: selected,
    };
  });
};