import React, { ChangeEvent, MouseEvent } from "react";

import { useFilterContext } from "../../context/filter_context";
import { getUniqueValues, formatPrice } from "../../utils/helpers";
import { FaCheck } from "react-icons/fa";
import Wrapper from "./Filters.styles";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === "price") {
      return updateFilters(e.target.name, +e.target.value);
    } else {
      updateFilters(e.target.name, e.target.value);
    }
  };

  const handleCheckChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilters(e.target.name, e.target.checked);
  };

  const handleBtnClick = (e: any) => {
    if (e.target.name === "color") {
      return updateFilters(e.target.name, e.target.dataset.color);
    } else {
      updateFilters(e.target.name, e.target.textContent);
    }
  };

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={handleInputChange}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={handleBtnClick}
                    name="category"
                    type="button"
                    className={`${
                      category === item.toLowerCase() ? "active" : null
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories  */}
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={handleInputChange}
              className="company"
            >
              {companies.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((item, index) => {
                if (item === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={handleBtnClick}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }

                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: item }}
                    className={`${
                      color === item ? "color-btn active" : "color-btn"
                    }`}
                    data-color={item}
                    onClick={handleBtnClick}
                  >
                    {color === item ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={handleInputChange}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={handleCheckChange}
              checked={shipping}
            />
          </div>
          {/* end of shipping */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

export default Filters;
