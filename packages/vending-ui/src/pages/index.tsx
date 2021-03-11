import React from 'react';
import Seo from '@/components/Seo';
import { Select, Row, Col } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

const Home: NextPage<Props> = () => {
  const router = useRouter();
  const onChange = (value: string): void => {
    router.push(`/${value}`);
  };

  return (
    <div>
      <Seo title="Select Machine" description="Vending machine by Drink. select any drinking as you want." />
      <Row style={{ height: '100vh' }}>
        <Col>Please Select Vending Machine</Col>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a machine"
          optionFilterProp="children"
          onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option value="machineId1">Machine 1</Select.Option>
          <Select.Option value="machineId2">Machine 2</Select.Option>
          <Select.Option value="machineId3">Machine 3</Select.Option>
        </Select>
      </Row>
    </div>
  );
};

export default Home;
