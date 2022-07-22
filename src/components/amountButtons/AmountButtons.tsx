import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Wrapper from "./AmountButtons.styles";
import { useCartContext } from "../../context/cart_context";
interface ButtonsProps {
  increase: () => void;
  decrease: () => void;
  remove: () => void;
  amount: number;
}
const AmountButtons = ({
  increase,
  decrease,
  remove,
  amount,
}: ButtonsProps) => {
  const { removeItem } = useCartContext();
  return (
    <Wrapper className="amount-btns">
      <button
        type="button"
        className="amount-btn"
        onClick={amount > 1 ? decrease : remove}
      >
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button type="button" className="amount-btn" onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

export default AmountButtons;
