import { Button, Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface Props {
  image: string;
  name: string;
  price: number;
  qty: number;
  onQtyChange: (any) => void;
  onRemoveClick: (any) => void;
}

const ProductName = styled.div`
  font-size: 16px;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const QtyInput = styled.input`
  background: #ffffff;
  border: 1px solid #dddddd;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  width: auto;
  margin: 0 16px;
  padding: 8px;
  width: auto;
`;

const FlexBox = styled.div`
  display: flex;
  align-content: flex-start;
  align-items: center;
  justify-content: flex-start;
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

const ProductItem: React.FC<Props> = ({ name, price, image, qty, onQtyChange, onRemoveClick }) => {
  let delay;

  const onQtyChangeDelay = (qty) => {
    if (delay) {
      clearTimeout(delay);
    }

    delay = setTimeout(() => {
      onQtyChange(qty);
    }, 1000);
  };
  return (
    <div>
      <Row align="middle">
        <Col flex="0 0 70px" style={{ marginRight: 24 }}>
          <ImageContainer>
            <Image src={image} alt={name} />
          </ImageContainer>
        </Col>
        <Col flex="1 1 300px">
          <ProductName>{name}</ProductName>
          <ProductPrice>{price} ฿</ProductPrice>
        </Col>
        <Col flex="1 1 auto">
          <FlexBox>
            <div>Stock</div>
            <QtyInput type="number" defaultValue={qty} onChange={(e) => onQtyChangeDelay(e.target.value)} />
          </FlexBox>
        </Col>
        <Col>
          <Button key="list-loadmore-more" onClick={onRemoveClick}>
            remove from machine
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductItem;
