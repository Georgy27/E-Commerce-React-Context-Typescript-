import React from "react";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { IProducts } from "../../models/products";
import Wrapper from "./ListView.styles";
import { format } from "path";

interface ListViewProps {
  products: IProducts[];
}

const ListView = ({ products }: ListViewProps) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, name, price, description } = product;
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <h5 className="price">{formatPrice(price)}</h5>
              <p>{description.substring(0, 150)}...</p>
              <Link to={`/products/${id}`} className="btn">
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

export default ListView;
