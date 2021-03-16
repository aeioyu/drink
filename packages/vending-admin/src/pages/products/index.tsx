import React, { useCallback, useState } from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import { Table, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useQueryClient } from 'react-query';
import PageHeader from '@/components/PageHeader';
import { useProducts, useRemoveProductMutation } from '@/hooks/products';

const ActionCol: React.FC = (text, record) => {
  const { mutate: removeMachineMutation } = useRemoveProductMutation();
  const queryClient = useQueryClient();

  return (
    <Space size="middle">
      <Link href={`/products/${record.id}`}>Edit</Link>
      <Button
        title="remove product"
        type="link"
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          if (confirm('confirm to delete this product?')) {
            removeMachineMutation(record.id, {
              onSuccess: () => {
                queryClient.invalidateQueries('products');
              },
            });
          }
        }}
      />
    </Space>
  );
};

const ImageColumn: React.FC = (text, record) => (
  <div>
    <img src={record.image} alt="" width={80} />
  </div>
);

const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    render: ImageColumn,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Sku',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Action',
    key: 'action',
    render: ActionCol,
  },
];

const ProductsPage: NextPage = () => {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
  });
  const { isLoading, data } = useProducts(pageInfo);

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
      <PageHeader title="All Products" sideBtn={<Link href="/products/new">+ New Product</Link>} />
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

export default ProductsPage;
