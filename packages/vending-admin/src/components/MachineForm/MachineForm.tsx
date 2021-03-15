import React from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import FormInput from '../FormInput';

interface Props {
  initialValue?: IFormInput;
  onSubmit: (data: IFormInput) => void;
}

interface IFormInput {
  name: string;
  serialNo: string;
  location: string;
  latitude: string;
  longitude: string;
}

const ButtonSubmit = styled.button`
  background: #4563e6;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 32px;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
`;

const MachineForm: React.FC<Props> = ({ initialValue, onSubmit }) => {
  const { register, handleSubmit } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput identifier="name" label="Machine Name" defaultValue={initialValue?.name} ref={register} />
      <FormInput identifier="serialNo" label="Serial No." defaultValue={initialValue?.serialNo} ref={register} />
      <FormInput identifier="location" label="Location" defaultValue={initialValue?.location} ref={register} />
      <FormInput identifier="latitude" label="Latitude" defaultValue={initialValue?.latitude} ref={register} />
      <FormInput identifier="longitude" label="Longitude" defaultValue={initialValue?.longitude} ref={register} />
      <Row style={{ marginBottom: 24 }}>
        <Col span={3}></Col>
        <Col>
          <ButtonSubmit type="submit">Save</ButtonSubmit>
        </Col>
      </Row>
    </form>
  );
};

export default MachineForm;
