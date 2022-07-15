import React from "react";
import { useFilterContext } from "../../context/filter_context";
import { BsFillGridFill, BsList } from "react-icons/bs";
import Wrapper from "./Sort.styles";

const Sort = () => {
  const { filtered_products: products, grid_view } = useFilterContext();
  return (
    <Wrapper>
      <div className="btn-container">
        <button type="button" className={`${grid_view ? "active" : null}`}>
          <BsFillGridFill />
        </button>
        <button type="button" className={`${!grid_view ? "active" : null}`}>
          <BsList />
        </button>
      </div>
      <p>{products.length} products found</p>
      <form>
        <label htmlFor="sort">sort by</label>
        <select name="sort" id="sort" className="sort-input">
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

export default Sort;
