import React from 'react';
import Seo from '@/components/Seo';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import Link from 'next/link';

const WaterList = styled.div`
  background-color: #efffff;
  height: 100%;
  overflow: auto;
`;

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

const MachineVendingPage: NextPage<Props> = () => {
  const { query } = useRouter();
  const machineId = query.machineId;

  return (
    <div>
      <Seo
        title={`Machine ID | ${machineId}`}
        description="Vending machine by Drink. select any drinking as you want."
      />
      <Row style={{ height: '100vh' }}>
        <Col span={16} style={{ height: '100vh' }}>
          <WaterList>
            <Link href="/">กลับ</Link>
            <Row gutter={[16, 16]}>
              <Col span={6}>Water 1</Col>
              <Col span={6}>Water 1</Col>
              <Col span={6}>Water 1</Col>
              <Col span={6}>Water 1</Col>
              <Col span={6}>Water 1</Col>
              <Col span={6}>Water 1</Col>
              <Col span={6}>Water 1</Col>
            </Row>
          </WaterList>
        </Col>
        <Col span={8}>
          Selected Drink
          <Row>
            <Col span={24}>Water 1 qty: 1 delete</Col>
            <Col span={24}>Water 2 qty: 1 delete</Col>
            <Col span={24}>Water 3 qty: 1 delete</Col>
          </Row>
          <Row gutter={12}>
            <Col span={6}>
              <Button size="large" block>
                เริ่มสั่งใหม่
              </Button>
            </Col>
            <Col span={18}>
              <Button type="primary" size="large" block>
                สั่งซื้อ
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MachineVendingPage;
