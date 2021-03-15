import React from 'react';
import Layout from '@/layouts/AppLayout';
import Seo from '@/components/Seo';
import { NextPage } from 'next';

const ReportPage: NextPage = () => {
  return (
    <Layout>
      <Seo title="System Admin of Drink" description="System Admin of Drink. the begining of everything." />
      Report Page
    </Layout>
  );
};

export default ReportPage;
