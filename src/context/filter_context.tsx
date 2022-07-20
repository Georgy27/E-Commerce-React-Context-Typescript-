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
import { IFilterState, IFiltersValues } from "../models/filter";
import { IProducts } from "../models/products";

interface ProviderProps {
  children: React.ReactNode;
}
interface FilterContextValue {
  filtered_products: IProducts[];
  all_products: IProducts[];
  grid_view: boolean;
  sort: string;
  filters: IFiltersValues;
  setGridView: () => void;
  setListView: () => void;
  updateSort: React.ChangeEventHandler<HTMLSelectElement>;
  updateFilters: (name: string, value: string | number | boolean) => void;
  clearFilters: () => void;
}

const initialState: IFilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

// CONTEXT
const FilterContext = React.createContext<FilterContextValue | null>(null);

export const FilterProvider: React.FC<ProviderProps> = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (name: string, value: string | number | boolean) => {
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const filter = useContext(FilterContext);

  if (filter === null) {
    throw new Error("Context value not provided");
  }

  return filter;
};
