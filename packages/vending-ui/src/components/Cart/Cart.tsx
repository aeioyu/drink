import { Button, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface Props {
  totals: number;
  isEmpty: boolean;
  isLoading: boolean;
  onCheckoutClick: () => void;
}

const CartContainer = styled.div`
  padding: 16px;
  box-shadow: 0 0px 20px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  border-radius: 5px;
  max-height: 90vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 9;

  width: 400px;
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
`;

const CartItemsContainer = styled.div`
  padding: 8px;
  background: #f0f0f0;
  border-radius: 5px;
  max-height: 50vh;
  overflow: auto;
`;

const StartShoppingMsg = styled.div`
  text-align: center;
  font-size: 24px;
  color: #aaaaaa;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
`;

const TotalsRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 40px;
  align-content: center;
  align-items: center;
  padding: 16px 16px 8px 16px;
  font-weight: bold;
`;

const FlexGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cart: React.FC<Props> = ({ totals, isEmpty, children, isLoading, onCheckoutClick }) => {
  return (
    <CartContainer>
      {isEmpty ? (
        <StartShoppingMsg>
          Choose Water You Like <br /> by Click on The Screen
        </StartShoppingMsg>
      ) : (
        <>
          <FlexGroup>
            <Typography.Title level={4} style={{ textAlign: 'center', color: '#333', marginBottom: 16 }}>
              Your Item(s).
            </Typography.Title>
            <CartItemsContainer>{children}</CartItemsContainer>
          </FlexGroup>
          <FlexGroup>
            <TotalsRow>
              <div style={{ fontSize: 20 }}>Totals</div>
              <div>{totals?.toLocaleString(undefined, { maximumFractionDigits: 2 })} ฿</div>
            </TotalsRow>
            <Button
              block
              shape="round"
              loading={isLoading}
              onClick={onCheckoutClick}
              style={{
                fontSize: 24,
                lineHeight: '130%',
                height: 60,
                letterSpacing: 2,
                textTransform: 'uppercase',
                background: '#00C600',
                color: '#ffffff',
              }}
            >
              Confirm
            </Button>
          </FlexGroup>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
