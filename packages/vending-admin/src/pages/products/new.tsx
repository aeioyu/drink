import React from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import PageHeader from '@/components/PageHeader';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import ProductForm from '@/components/ProductForm';
import { useCreateProductMutation } from '@/hooks/products';

const NewProductPage: NextPage = () => {
  const { mutate: createProductMutation, isLoading: isProductCreating } = useCreateProductMutation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const openNotificationWithIcon = (type, message): void => {
    notification[type]({
      message: `${type} !!`,
      description: message,
    });
  };

  return (
    <Layout>
      <PageHeader title="New Product" sideBtn={<Link href="/products">Go Back</Link>} />
      <ProductForm
        loading={isProductCreating}
        onSubmit={(data) =>
          createProductMutation(data, {
            onSuccess: (data: { id: number }) => {
              openNotificationWithIcon('success', 'Your new product is created.');
              queryClient.invalidateQueries('products');
              router.push(`/products/${data?.id}`);
            },
            onError: (err: any) => {
              openNotificationWithIcon('error', err?.response?.data?.message);
            },
          })
        }
      />
    </Layout>
  );
};

export default NewProductPage;
