import React from 'react';
import Layout from '@/layouts/AppLayout';
import Seo from '@/components/Seo';

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

const Home: React.FC<Props> = () => {
  return (
    <Layout home>
      <Seo title="System Admin of Drink" description="System Admin of Drink. the begining of everything." />
      this is system admin
    </Layout>
  );
};

export default Home;
