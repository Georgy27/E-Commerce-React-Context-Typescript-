import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../../context/cart_context";
import AmountButtons from "../amountButtons/AmountButtons";
import { ISingleProduct } from "../../models/products";
import Wrapper from "./AddToCart.styles";

interface CartProps {
  product: ISingleProduct;
}
const AddToCart: React.FC<CartProps> = ({ product }) => {
  const { id, stock, colors } = product;
  console.log(colors);
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;

      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };

  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;

      if (tempAmount < 1) {
        tempAmount = 1;
      }

      return tempAmount;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span> colors :</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`${
                  mainColor === color ? "active color-btn" : "color-btn"
                }`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link to="/cart" className="btn">
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

export default AddToCart;
