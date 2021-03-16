import React from 'react';
import styled from 'styled-components';

interface Props {
  selectedQty: number;
}

const CartSelectedCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #73e973;
  right: 0;
  height: 40%;
  width: 70%;
  border-radius: 50%;
  z-index: 0;
`;

// const CartSelectedCircleQty = styled.div`
//   position: absolute;
//   top: -20px;
//   right: -20px;
//   background: #00c600;
//   /* border: 5px solid #ffffff; */
//   color: #ffffff;
//   height: 70px;
//   width: 70px;
//   line-height: 70px;
//   text-align: center;
//   font-size: 40px;
//   border-radius: 50%;
//   z-index: 1;
// `;

const CartSelected: React.FC<Props> = ({ selectedQty }) => {
  if (!selectedQty) return null;

  return (
    <div>
      <CartSelectedCircle>{/* <CartSelectedCircleQty>{selectedQty}</CartSelectedCircleQty> */}</CartSelectedCircle>
    </div>
  );
};

export default CartSelected;
