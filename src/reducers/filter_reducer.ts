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
  type: typeof SET_GRIDVIEW | typeof SET_LISTVIEW | typeof SORT_PRODUCTS | typeof CLEAR_FILTERS | typeof FILTER_PRODUCTS
} | { type: typeof LOAD_PRODUCTS, payload: IProducts[] } | { type: typeof UPDATE_SORT, payload: string } | {
  type: typeof UPDATE_FILTERS, payload: {
    name: string,
    value: string | number | boolean
  }
}


const filter_reducer = (state: IFilterState, action: FilterAction): IFilterState => {

  switch (action.type) {
    case LOAD_PRODUCTS: {
      const maxPrice = action.payload.map((item) => item.price)
      const newMaxPrice = Math.max(...maxPrice)

      return {
        ...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: { ...state.filters, max_price: newMaxPrice, price: newMaxPrice }
      }
    }
    case SET_GRIDVIEW: {
      return {
        ...state, grid_view: true
      }
    }

    case SET_LISTVIEW: {
      return {
        ...state, grid_view: false
      }
    }

    case UPDATE_SORT: {
      return {
        ...state, sort: action.payload
      }
    }

    case SORT_PRODUCTS: {

      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.price - b.price
        })
      }

      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.price - a.price
        })
      }

      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }

      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }

      return {
        ...state, filtered_products: tempProducts
      }
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload
      return {
        ...state, filters: {
          ...state.filters, [name]: value
        }
      }
    }

    case CLEAR_FILTERS: {

      return {
        ...state, filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        }
      }
    }
    case FILTER_PRODUCTS: {
      const { all_products } = state
      const { text, category, company, color, price, shipping } = state.filters
      let tempProducts = [...all_products]

      //filtering
      // ext
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().includes(text)
        })
      }

      // category
      if (category !== "all") {
        tempProducts = tempProducts.filter((product) => product.category === category)
      }

      // company
      if (company !== "all") {
        tempProducts = tempProducts.filter((product) => product.company === company)
      }

      // color
      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((item) => item === color)
        })
      }

      // price

      tempProducts = tempProducts.filter((product) => product.price <= price)


      // shipping 
      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping === true)
      }
      return { ...state, filtered_products: tempProducts }
    }

    default:
      return state;
  }
}


export default filter_reducer
