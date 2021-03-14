import React from 'react';
import styled from 'styled-components';

const ProductPreviewContainer = styled.div`
  padding: 8px;
  pointer-events: ${({ outOfStock }) => (outOfStock ? 'none' : 'default')};
  filter: ${({ outOfStock }) => (outOfStock ? 'grayscale(100%)' : 'none')};
  opacity: ${({ outOfStock }) => (outOfStock ? '0.3' : '1')};
  position: relative;
  z-index: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 0;
  padding-bottom: 140%;
  overflow: hidden;
  position: relative;
  margin-bottom: 16px;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  height: 100%;
  max-width: none;
`;

const ProductName = styled.div`
  font-size: 18px;
  text-align: center;
`;

const ProductPrice = styled.div`
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  color: #333333;
`;

interface Props {
  image: string;
  name: string;
  price: number;
  outOfStock: boolean;
  onClick: () => void;
}

const ProductPreview: React.FC<Props> = ({ image, name, price, outOfStock, onClick, ...rest }) => {
  return (
    <ProductPreviewContainer {...rest} onClick={onClick} outOfStock={outOfStock}>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
      <ProductPrice>{price} ฿</ProductPrice>
      <ProductName>{name}</ProductName>
    </ProductPreviewContainer>
  );
};

export default ProductPreview;
