import { IProducts } from "../models/products"

export interface IFilterState {
  filtered_products: IProducts[];
  all_products: IProducts[];
  grid_view: boolean
}