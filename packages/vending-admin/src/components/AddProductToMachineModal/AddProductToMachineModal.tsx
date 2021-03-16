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
  background: #ffffff;
  min-height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 100px;
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
  max-height: 60vh;
  overflow: auto;
`;

const ProductItem = styled.div`
  border: ${({ active }) => (active ? '3px solid #2cac5d;' : '3px solid #eeeeee;')};
  padding: 10px;
  cursor: pointer;
  text-align: center;
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

const AddProductToMachineModal: React.FC<Props> = ({ onSubmit, onCloseClick, loading }) => {
  const { data, isLoading } = useProducts({
    limit: 0,
    page: 1,
  });
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
                  <ImageContainer>
                    <Image src={item.image} />
                  </ImageContainer>
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
