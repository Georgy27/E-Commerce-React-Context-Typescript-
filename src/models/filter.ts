import { IProducts } from "../models/products"

export interface IFiltersValues {
  text: string,
  company: string,
  category: string,
  color: string,
  min_price: number,
  max_price: number,
  price: number,
  shipping: boolean,
}
export interface IFilterState {
  filtered_products: IProducts[];
  all_products: IProducts[];
  grid_view: boolean;
  sort: string;
  filters: IFiltersValues
}