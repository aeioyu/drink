import React from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import PageHeader from '@/components/PageHeader';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import ProductForm from '@/components/ProductForm';
import { useProduct, useUpdateProductMutation } from '@/hooks/products';

const UpdateProductPage: NextPage = () => {
  const { query } = useRouter();
  const productId = Number(query.productId);
  const { data: productInfo } = useProduct(productId);
  const { mutate: updateProductMutation, isLoading: isProductUpdating } = useUpdateProductMutation(productId);
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
      <PageHeader title="Edit Product" sideBtn={<Link href="/products">Go Back</Link>} />
      <ProductForm
        loading={isProductUpdating}
        initialValue={{
          name: productInfo?.name,
          sku: productInfo?.sku,
          description: productInfo?.description,
          image: productInfo?.image,
          price: productInfo?.price,
        }}
        onSubmit={(data) =>
          updateProductMutation(data, {
            onSuccess: (data: { id: number }) => {
              openNotificationWithIcon('success', 'Your product is updated.');
              queryClient.invalidateQueries(['products', productId]);
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

export default UpdateProductPage;
