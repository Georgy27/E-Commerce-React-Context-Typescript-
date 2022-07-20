import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'
import { ICartState, } from "../models/cart";
import { ISingleProduct } from "../models/products"
import { clamp } from '../utils/helpers';

type CartAction =
  {
    type: typeof CLEAR_CART | typeof COUNT_CART_TOTALS
  } | {
    type: typeof ADD_TO_CART, payload: {
      id: string,
      color: string,
      amount: number,
      product: ISingleProduct
    }
  } |
  { type: typeof REMOVE_CART_ITEM, payload: string } |
  {
    type: typeof TOGGLE_CART_ITEM_AMOUNT, payload: {
      id: string, value: "inc" | "dec"
    }
  }



const cart_reducer = (state: ICartState, action: CartAction): ICartState => {

  switch (action.type) {

    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload
      const tempItem = state.cart.find((item) => item.id === id + color)

      // if our cart is not empty, we are checking if the item is already in the cart since we don't want to create another one in this case, but to incr amount
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })

        return { ...state, cart: tempCart, }

        // if item is not in the cart already

      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock

        }
        return { ...state, cart: [...state.cart, newItem] }
      }
    }

    case REMOVE_CART_ITEM: {

      const tempCart = state.cart.filter((item) => item.id !== action.payload)

      return { ...state, cart: tempCart }
    }

    case CLEAR_CART: {

      return {
        ...state,
        cart: []
      }
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload

      const tempCart = state.cart.map((item) => {
        if (item.id !== id) {
          return item
        }

        let direction = value === "inc" ? 1 : -1
        let newAmount = clamp(item.amount + (direction), 1, item.max);

        return { ...item, amount: newAmount }
      })

      return { ...state, cart: tempCart }
    }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce((total, cartItem) => {

        const { amount, price } = cartItem

        total.total_items += amount;
        total.total_amount += price * amount
        return total
      }, {
        total_items: 0, total_amount: 0
      })

      return { ...state, total_items, total_amount }
    }

    default:
      return state;
  }


}

export default cart_reducer
