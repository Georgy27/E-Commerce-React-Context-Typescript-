import React from "react";

import { useCartContext } from "../../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../../components";
import Wrapper from "./CartPage.styles";

const CartPage = () => {
  const { cart } = useCartContext();

  // empty cart
  if (cart.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            fill it
          </Link>
        </div>
      </Wrapper>
    );
  }

  // cart with items
  return (
    <main>
      <PageHero title="cart" />
      <Wrapper className="page">
        <CartContent />
      </Wrapper>
    </main>
  );
};

export default CartPage;
