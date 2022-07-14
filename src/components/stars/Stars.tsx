import React from "react";

import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Wrapper from "./Stars.styles";

interface StarsProps {
  stars: number;
  reviews: number;
}
const Stars = ({ stars, reviews }: StarsProps) => {
  const tempStars = Array.from({ length: 5 }).map((_, index) => {
    const number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="stars">{tempStars}</div>
      <p className="reviews">{reviews} customer reviews</p>
    </Wrapper>
  );
};

export default Stars;
