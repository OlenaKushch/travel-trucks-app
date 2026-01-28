export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryImage[];
  reviews: Review[];
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
}
export interface Filters {
  location: string;
  form: string | null;
  transmission: string | null;
  AC?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
}
export interface GalleryImage {
  thumb: string;
  original: string;
}
export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}
