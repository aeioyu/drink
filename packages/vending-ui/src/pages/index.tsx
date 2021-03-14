import React from 'react';
import Seo from '@/components/Seo';
import { Select, Row, Col, Typography, Card, Spin } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useMachines } from '@/hooks/machines';
import styled from 'styled-components';
import AppBackground from '@/components/AppBackground';

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

const HomePageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const SpinnerLoading = styled.div`
  position: absolute;
  right: -25px;
  top: 10px;
`;

const Home: NextPage<Props> = () => {
  const router = useRouter();
  const { isLoading, data } = useMachines();
  const onChange = (value: string): void => {
    router.push(`/${value}`);
  };

  return (
    <>
      <Seo title="Vending Machine by Drink" description="Vending machine by Drink. select any drinking as you want." />
      <HomePageContainer>
        <Card
          bordered={false}
          style={{
            width: '100%',
            maxWidth: 600,
            margin: '0 auto',
            padding: 24,
            boxShadow: '0 0px 25px rgba(0,0,0,0.1)',
          }}
        >
          <Row>
            <Col span={24}>
              <Typography.Title level={5} style={{ textAlign: 'center' }}>
                Welcome to Drink.
              </Typography.Title>
              <Typography.Title level={1} style={{ textAlign: 'center' }}>
                Select Vending Machine
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Select
                style={{ width: '100%' }}
                disabled={isLoading}
                showSearch
                placeholder="Serial Number, Name"
                optionFilterProp="children"
                onChange={onChange}
                size="large"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {data?.items?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {`${item.name} (${item.serialNo})`}
                  </Select.Option>
                ))}
              </Select>
              {isLoading && (
                <SpinnerLoading>
                  <Spin />
                </SpinnerLoading>
              )}
            </Col>
          </Row>
        </Card>
        <AppBackground blur={15} />
      </HomePageContainer>
    </>
  );
};

export default Home;
