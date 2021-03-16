import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface Props {
  image: string;
  name: string;
  price: number;
  qty: number;
  onQtyChange: (any) => void;
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

const ProductItem: React.FC<Props> = ({ name, price, image, qty, onQtyChange }) => {
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
        <Col flex="70px" style={{ marginRight: 24 }}>
          <img src={image} alt={name} style={{ width: '100%' }} />
        </Col>
        <Col flex="400px">
          <ProductName>{name}</ProductName>
          <ProductPrice>{price} ฿</ProductPrice>
        </Col>
        <Col>
          <FlexBox>
            <div>Stock</div>
            <QtyInput type="number" defaultValue={qty} onChange={(e) => onQtyChangeDelay(e.target.value)} />
          </FlexBox>
        </Col>
      </Row>
    </div>
  );
};

export default ProductItem;
