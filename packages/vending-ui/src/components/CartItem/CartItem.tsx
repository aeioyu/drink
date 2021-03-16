import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  qty: number;
  image: string;
  price: number;
  onIncreaseClick?: () => void;
  onDecreaseClick?: () => void;
  onRemoveClick?: () => void;
}

const CartContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  position: relative;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;

  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`;

const QtyBox = styled.div`
  display: block;
  font-size: 24px;
  min-width: 50px;
  text-align: center;
  border: 1px solid #eaeaea;
  border-top: 0;
  border-bottom: 0;
`;

const Totals = styled.div`
  font-size: 24px;
  min-width: 100px;
  text-align: right;
  padding-right: 16px;
`;

const AdjustButton = styled.button`
  border: none;
  color: ${({ color }) => `${color}`};
  font-size: 30px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  background: none;
  cursor: pointer;
`;

const RemoveCartButton = styled.div`
  background: #eeeeee;
  border: 0;
  cursor: pointer;
  color: #ffffff;
  text-align: center;

  position: absolute;
  right: 0px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  background: #ff4e4f;
  border-radius: 50%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 0;
  padding-bottom: 140%;
  position: relative;
  margin-bottom: 16px;
`;

const Image = styled.img`
  position: absolute;
  top: -10%;
  height: 100%;
  max-width: none;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  border: 1px solid #eeeeee;
`;

const CartItem: React.FC<Props> = ({ name, qty, image, price, onIncreaseClick, onDecreaseClick, onRemoveClick }) => {
  return (
    <CartContainer>
      <ImageBox>
        <ImageContainer>
          <Image src={image} alt={name} />
        </ImageContainer>
      </ImageBox>
      <PriceRow>
        <AdjustButton color="#D27373" onClick={onDecreaseClick}>
          -
        </AdjustButton>
        <QtyBox>{qty}</QtyBox>
        <AdjustButton color="#19D6AC" onClick={onIncreaseClick}>
          +
        </AdjustButton>
      </PriceRow>
      <Totals level={4}>{(price * qty)?.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿</Totals>
      {/* <div>{name}</div> */}
      <RemoveCartButton onClick={onRemoveClick}>X</RemoveCartButton>
    </CartContainer>
  );
};

export default CartItem;
