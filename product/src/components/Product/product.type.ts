import { ICategory } from '../Category/category.type'
export interface IProduct {
  list_img: {id: number; url: string}[];
  category: ICategory[];
  rated: number;
  reviews: number;
  description_short: string;
  price: number;
  availability: boolean;
  weight: number;
  description: string;
  infomation: string;
  name: string;
  id: number;
  count: number;
  discount: number;
}
