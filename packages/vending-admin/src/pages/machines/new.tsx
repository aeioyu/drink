import React from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import PageHeader from '@/components/PageHeader';
import MachineForm from '@/components/MachineForm';
import { useCreateMachineMutation } from '@/hooks/machines';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const NewMachinesPage: NextPage = () => {
  const { mutate: createMachineMutation } = useCreateMachineMutation();
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
      <PageHeader title="New Machine" sideBtn={<Link href="/machines">Go Back</Link>} />
      <MachineForm
        onSubmit={(data) =>
          createMachineMutation(data, {
            onSuccess: (data: { id: number }) => {
              openNotificationWithIcon('success', 'Your new machine is created.');
              queryClient.invalidateQueries('machines');
              router.push(`/machines/${data?.id}`);
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

export default NewMachinesPage;
