import { useProducts } from '@/hooks/products';
import { Button, Col, PageHeader, Row, Space } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  onSubmit: (any) => any;
  onCloseClick: () => void;
  loading: boolean;
}

const AddMoreContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;

  overflow: auto;
`;

const AddMoreBox = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  max-height: 90vh;
  background: #ffffff;
  min-height: 500px;
  transform: translateY(30%);
`;

const BoxFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  align-items: flex-end;
  display: flex;
  align-content: flex-end;
  justify-content: flex-end;
  border-top: 1px solid #eeeeee;
`;

const Content = styled.div`
  display: flex;
  padding: 0 24px;
`;

const ProductItem = styled.div`
  border: ${({ active }) => (active ? '3px solid #2cac5d;' : '3px solid #eeeeee;')};
  padding: 10px;
  cursor: pointer;
  text-align: center;
`;

const AddProductToMachineModal: React.FC<Props> = ({ onSubmit, onCloseClick, loading }) => {
  const { data, isLoading } = useProducts();
  const [importProduct, setImportProduct] = useState({});

  const onProductItemClick = (newProductId) => {
    const newImportedList = { ...importProduct };
    const isActive = newImportedList[newProductId];

    if (isActive) {
      delete newImportedList[newProductId];
    } else {
      newImportedList[newProductId] = true;
    }

    setImportProduct(newImportedList);
  };

  return (
    <AddMoreContainer>
      <AddMoreBox>
        <PageHeader title={`Select Product To Import to Vending Machine`} />
        <Content>
          <Row gutter={[8, 64]}>
            {isLoading && 'loading'}
            {data?.items.map((item) => (
              <Col flex="170px" key={item.id}>
                <ProductItem active={importProduct[item.id]} onClick={() => onProductItemClick(item.id)}>
                  <img src={item.image} alt="" />
                  <br />
                  <p>{item.name}</p>
                </ProductItem>
              </Col>
            ))}
          </Row>
        </Content>
        <BoxFooter>
          <Space>
            <Button size="large" onClick={onCloseClick}>
              Close
            </Button>
            <Button loading={loading} type="primary" size="large" onClick={() => onSubmit(Object.keys(importProduct))}>
              Submit
            </Button>
          </Space>
        </BoxFooter>
      </AddMoreBox>
    </AddMoreContainer>
  );
};

export default AddProductToMachineModal;
