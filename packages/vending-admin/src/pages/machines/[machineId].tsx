import React, { useState } from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import MachineForm from '@/components/MachineForm';
import {
  useImportMachineProductMutation,
  useMachine,
  useMachineProducts,
  useUpdateMachineMutation,
  useRemoveMachineProductMutation,
} from '@/hooks/machines';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/dist/client/router';
import { notification, Divider, Button, List } from 'antd';
import AddProductToMachineModal from '@/components/AddProductToMachineModal';
import ProductItem from '@/components/ProductItem';

const NewMachinesPage: NextPage = () => {
  const { query } = useRouter();
  const machineId = Number(query.machineId);
  const { data: machineInfo } = useMachine(machineId);
  const { mutate: updateMachineMutation } = useUpdateMachineMutation(machineId);
  const { data: products, isLoading: productLoading } = useMachineProducts(machineId);
  const [openImportModal, setOpenImportModal] = useState(false);
  const { mutate: importMachineProduct, isLoading: importMachineProductLoading } = useImportMachineProductMutation(
    machineId,
  );
  const { mutate: removeMachineProduct } = useRemoveMachineProductMutation(machineId);
  const queryClient = useQueryClient();

  const openNotificationWithIcon = (type, message): void => {
    notification[type]({
      message: `${type} !!`,
      description: message,
    });
  };

  const onImportProductSubmit = (importProductIds: string[]): void => {
    const importProductData = importProductIds.map((productId) => {
      const existingProduct = products?.items?.find((item) => item.productId === +productId);
      return {
        productId: +productId,
        machineId: +machineId,
        qty: existingProduct ? existingProduct.qty : 0,
      };
    });
    importMachineProduct(importProductData, {
      onSuccess: () => {
        openNotificationWithIcon('success', 'import product to machine success');
        setOpenImportModal(false);
        queryClient.invalidateQueries(['machines', 'products', machineId]);
      },
      onError: (err) => {
        openNotificationWithIcon('error', err?.response?.data?.message);
      },
    });
  };

  const onQtyChange = (machineId, productId, qty) => {
    const adjustStockData = {
      machineId: machineId,
      productId: productId,
      qty: qty,
    };
    importMachineProduct([adjustStockData], {
      onSuccess: () => {
        openNotificationWithIcon('success', `adjust product in product id #${productId} stock to ${qty} !!`);
      },
      onError: (err) => {
        openNotificationWithIcon('error', err?.response?.data?.message);
      },
    });
  };

  return (
    <Layout>
      <PageHeader title={`Machine Information`} sideBtn={<Link href="/machines">Go Back</Link>} />
      <MachineForm
        initialValue={{
          name: machineInfo?.name,
          serialNo: machineInfo?.serialNo,
          location: machineInfo?.location,
          latitude: machineInfo?.latitude,
          longitude: machineInfo?.longitude,
        }}
        onSubmit={(data) =>
          updateMachineMutation(data, {
            onSuccess: () => {
              openNotificationWithIcon('success', 'Your new machine is updated.');
              queryClient.invalidateQueries(['machines', machineId]);
            },
            onError: (err) => {
              openNotificationWithIcon('error', err?.response?.data?.message);
            },
          })
        }
      />
      <br />
      <Divider />
      <br />
      <PageHeader
        title={`Machine Products`}
        sideBtn={
          <Button onClick={() => setOpenImportModal(true)} type="primary" ghost>
            + Import Product
          </Button>
        }
      />
      {openImportModal && (
        <AddProductToMachineModal
          onSubmit={onImportProductSubmit}
          onCloseClick={() => setOpenImportModal(false)}
          loading={importMachineProductLoading}
        />
      )}
      {products?.items?.length === 0 && (
        <div style={{ textAlign: 'center' }}>No Product On This Vending Machine yet.</div>
      )}

      <List
        className="demo-loadmore-list"
        loading={productLoading}
        itemLayout="horizontal"
        loadMore={false}
        dataSource={products?.items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="list-loadmore-more"
                onClick={() =>
                  removeMachineProduct(item.productId, {
                    onSuccess: () => {
                      queryClient.invalidateQueries(['machines', 'products', machineId]);
                    },
                  })
                }
              >
                remove from machine
              </Button>,
            ]}
          >
            <ProductItem
              name={item.product.name}
              price={item.product.price}
              image={item.product.image}
              qty={item.qty}
              onQtyChange={(qty) => onQtyChange(item.machineId, item.productId, qty)}
            />
          </List.Item>
        )}
      />
    </Layout>
  );
};

export default NewMachinesPage;
