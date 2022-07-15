import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";
import { IFilterState } from "../models/filter";
import { IProducts } from "../models/products";

interface ProviderProps {
  children: React.ReactNode;
}
interface FilterContextValue {
  filtered_products: IProducts[];
  all_products: IProducts[];
  grid_view: boolean;
}

const initialState: IFilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
};

// CONTEXT
const FilterContext = React.createContext<FilterContextValue | null>(null);

export const FilterProvider: React.FC<ProviderProps> = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use

export const useFilterContext = () => {
  const products = useContext(FilterContext);

  if (products === null) {
    throw new Error("Context value not provided");
  }

  return products;
};
