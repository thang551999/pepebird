import type { ReactElement } from 'react';
import type { GetServerSideProps } from 'next';

import Layout from 'components/Layout/Public';
import WhitePaperPage from 'components/Pages/WhitePaper';
import { NextPageWithLayout } from 'pages/_app';

const WhitePaper: NextPageWithLayout = () => (
  <div className='app-whitepaper'>
    <WhitePaperPage />
  </div>
);

WhitePaper.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default WhitePaper;
