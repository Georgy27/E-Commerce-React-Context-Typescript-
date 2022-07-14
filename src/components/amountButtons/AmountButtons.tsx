import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Wrapper from "./AmountButtons.styles";

interface ButtonsProps {
  increase: () => void;
  decrease: () => void;
  amount: number;
}
const AmountButtons = ({ increase, decrease, amount }: ButtonsProps) => {
  return (
    <Wrapper className="amount-btns">
      <button type="button" className="amount-btn" onClick={decrease}>
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
