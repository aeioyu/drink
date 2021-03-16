import React from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import FormInput from '../FormInput';

interface Props {
  initialValue?: IFormInput;
  onSubmit: (data: IFormInput) => void;
  loading: boolean;
}

interface IFormInput {
  name: string;
  sku: string;
  description?: string;
  image: string;
  price: number;
}

const ProductForm: React.FC<Props> = ({ initialValue, onSubmit, loading }) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput identifier="name" label="Product Name" defaultValue={initialValue?.name} ref={register} />
      <FormInput identifier="sku" label="Sku" defaultValue={initialValue?.sku} ref={register} />
      <FormInput identifier="description" label="Description" defaultValue={initialValue?.description} ref={register} />
      <FormInput identifier="image" label="Image" defaultValue={initialValue?.image} ref={register} />
      <FormInput identifier="price" label="Price" defaultValue={initialValue?.price} ref={register} />
      <Row style={{ marginBottom: 24 }}>
        <Col span={3}></Col>
        <Col>
          <Button type="primary" htmlType="submit" loading={loading} size="large">
            Save
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default ProductForm;
