export interface MaterialForm {
  id: string;
  name: string;
}

export interface MaterialSeries {
  id: string;
  title: string;
  grades: string[];
  forms: MaterialForm[];
}

export interface MaterialDatasheet {
  title: string;
  file: string;
}

export interface MaterialCategory {
  id: string;
  title: string;
  slug: string;

  image?: string;
  description?: string;

  series: MaterialSeries[];

  datasheet: MaterialDatasheet;
}
