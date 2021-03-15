import React from 'react';
import Layout from '@/layouts/AppLayout';
import { NextPage } from 'next';
import SettingForm from '@/components/SettingForm';
import PageHeader from '@/components/PageHeader';

const SettingsPage: NextPage = () => {
  return (
    <Layout>
      <PageHeader title="Settings" />
      <SettingForm
        initialValue={{
          notificationEmail: 'aeio.yu2@gmail.com',
        }}
        onSubmit={() => null}
      />
    </Layout>
  );
};

export default SettingsPage;
