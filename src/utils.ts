import slugify from 'slugify';

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