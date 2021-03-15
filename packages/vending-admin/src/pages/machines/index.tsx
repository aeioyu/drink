import React, { useCallback, useState } from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import { useRemoveMachineMutation, useMachines } from '@/hooks/machines';
import Link from 'next/link';
import { useQueryClient } from 'react-query';
import PageHeader from '@/components/PageHeader';

const ActionCol: React.FC = (text, record) => {
  const { mutate: removeMachineMutation } = useRemoveMachineMutation();
  const queryClient = useQueryClient();

  return (
    <Space size="middle">
      <Link href={`/machines/${record.id}`}>Edit</Link>
      <Button
        title="remove machine"
        type="link"
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          if (confirm('confirm to delete this machine')) {
            removeMachineMutation(record.id, {
              onSuccess: () => {
                queryClient.invalidateQueries('machines');
              },
            });
          }
        }}
      />
    </Space>
  );
};

const LocationCol: React.FC = (text, record) => (
  <div>
    <div>{record.location}</div>
    <div>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.google.com/maps/search/${record.latitude},+${record.longitude}`}
        style={{ color: '#777777', fontSize: 12 }}
      >
        {record.latitude}, {record.longitude} <ExportOutlined />
      </a>
    </div>
  </div>
);

const columns = [
  {
    title: 'Machine Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Serial No.',
    dataIndex: 'serialNo',
    key: 'serialNo',
  },
  {
    title: 'Location',
    key: 'location',
    render: LocationCol,
  },
  {
    title: 'Action',
    key: 'action',
    render: ActionCol,
  },
];

const MachinesPage: NextPage = () => {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const { isLoading, data } = useMachines(pageInfo);

  const handleTableChange = useCallback(
    (pagination) => {
      const newPageInfo = {
        ...pageInfo,
        page: pagination.current,
      };

      setPageInfo(newPageInfo);
    },
    [pageInfo],
  );

  return (
    <Layout>
      <PageHeader title="All Vending Machines" sideBtn={<Link href="/machines/new">+ New Machine</Link>} />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data?.items}
        pagination={{
          pageSize: data?.limit,
          current: data?.page,
          total: data?.totals,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </Layout>
  );
};

export default MachinesPage;
