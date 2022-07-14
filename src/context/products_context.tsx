import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
import { IProducts, IProductsState, ISingleProduct } from "../models/products";

interface ProviderProps {
  children: React.ReactNode;
}
interface ProductContextValue {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  products_loading: boolean;
  products_error: boolean;
  products: IProducts[];
  featured_products: IProducts[];
  single_product_loading: boolean;
  single_product_error: boolean;
  single_product: ISingleProduct;
  fetchSingleProduct: (url: string) => void;
}

const initialState: IProductsState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as ISingleProduct,
};

// CONTEXT
const ProductsContext = React.createContext<ProductContextValue | null>(null);

export const ProductsProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // Fetching Products
  const fetchProducts = async (url: string) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });

    try {
      const response = await axios.get(url);
      const products = response.data as IProducts[];
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Fetching Single Product
  const fetchSingleProduct = React.useCallback(
    async (url: string) => {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

      try {
        const response = await axios.get(url);
        const singleProduct = response.data as IProducts[];

        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
      } catch (err) {
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
      }
    },
    [url]
  );

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const products = useContext(ProductsContext);

  if (products === null) {
    throw new Error("Context value not provided");
  }

  return products;
};
