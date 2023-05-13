import type { ReactElement } from 'react';
import type { GetServerSideProps } from 'next';

import Layout from 'components/Layout/Public';
import HomePage from 'components/Pages/HomePage';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <div className='homepage'>
    <HomePage />
  </div>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default Home;
