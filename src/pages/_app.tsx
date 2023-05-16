import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';

import { Web3ReactProvider } from '@web3-react/core';
import { LIBRARY_CONSTANTS } from 'constant/library';

import AppConnectWalletWrapper from 'components/AppConnectWalletWrapper';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/_app.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout | any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
      <ToastContainer limit={1} />

      {/* <AuthProvider session={session} refetchOnWindowFocus={false}> */}
      <AppConnectWalletWrapper>{getLayout(<Component {...pageProps} />)}</AppConnectWalletWrapper>
      {/* </AuthProvider> */}
    </Web3ReactProvider>
  );
};

export default MyApp;
