import React from "react";
import { formatPrice } from "../../utils/helpers";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IProducts } from "../../models/products";
import Wrapper from "./Product.styles";

interface ProductProps
  extends Pick<IProducts, "image" | "name" | "price" | "id"> {}

const Product = ({ image, name, price, id }: ProductProps) => {
  return (
    <Wrapper>
      <div className="container">
        <img src={image} alt={name} />
        <Link to={`/products/${id}`} className="link">
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  );
};

export default Product;
