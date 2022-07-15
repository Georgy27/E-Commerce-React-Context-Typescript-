import React from "react";
import Product from "../product/Product";
import { IProducts } from "../../models/products";
import Wrapper from "./GridView.styles";

interface GridViewProps {
  products: IProducts[];
}

const GridView = ({ products }: GridViewProps) => {
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

export default GridView;
