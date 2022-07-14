import React from "react";
import { useProductsContext } from "../../context/products_context";
import { Link } from "react-router-dom";
import Error from "../Error";
import Loading from "../Loading";
import Product from "../product/Product";
import Wrapper from "./FeaturedProducts.styles";

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper className="section">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {featured.slice(0, 3).map((item) => {
          return <Product key={item.id} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};

export default FeaturedProducts;
