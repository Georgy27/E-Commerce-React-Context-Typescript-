import React, { useState } from "react";
import styled from "styled-components";
import Wrapper from "./ProductImages.styles";

interface Image {
  url: string;
  filename?: string;
}
interface ImagesProps {
  images: Image[];
}

const ProductImages = ({ images = [{ url: "" }] }: ImagesProps) => {
  const [main, setMain] = useState(images[0]);

  return (
    <Wrapper>
      <img className="main" src={main.url} alt="main" />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMain(images[index])}
              className={`${image.url === main.url ? "active" : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default ProductImages;
