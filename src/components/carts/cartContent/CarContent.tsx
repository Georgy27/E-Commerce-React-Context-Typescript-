import React from "react";
import { useCartContext } from "../../../context/cart_context";
import { Link } from "react-router-dom";
import CartColumns from "../cartColumns/CartColumns";
import CartItem from "../cartItem/CartItem";
import CartTotals from "../cartTotals/CartTotals";
import Wrapper from "./CartContent.styles";

const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className="section section-center">
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          continue shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={clearCart}
        >
          clear shopping cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};

export default CartContent;
