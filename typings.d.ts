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