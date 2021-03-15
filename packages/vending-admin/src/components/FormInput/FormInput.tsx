import { Row, Col } from 'antd';
import React, { ForwardRefRenderFunction } from 'react';
import styled from 'styled-components';

interface Props {
  identifier: string;
  label: string;
  defaultValue: any;
}

const Input = styled.input`
  width: 100%;
  background: #ffffff;
  font-size: 16px;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
  box-shadow: none;
  padding: 4px 8px;
`;

const FormInput: ForwardRefRenderFunction<Props, any> = ({ identifier, label, defaultValue }, ref) => {
  return (
    <Row style={{ marginBottom: 24 }}>
      <Col span={3}>
        <label htmlFor={identifier}>{label}</label>
      </Col>
      <Col span={6}>
        <Input id={identifier} name={identifier} defaultValue={defaultValue} ref={ref} />
      </Col>
    </Row>
  );
};

export default React.forwardRef(FormInput);
