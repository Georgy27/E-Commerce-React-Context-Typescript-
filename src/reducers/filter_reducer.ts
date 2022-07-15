import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { IProducts, } from "../models/products";
import { IFilterState, } from "../models/filter";

type FilterAction = {
  type: typeof LOAD_PRODUCTS, payload: IProducts[]
}

const filter_reducer = (state: IFilterState, action: FilterAction): IFilterState => {

  switch (action.type) {
    case LOAD_PRODUCTS: {
      return {
        ...state, all_products: [...action.payload], filtered_products: [...action.payload]
      }
    }
    default:
      return state;
  }
}


export default filter_reducer
