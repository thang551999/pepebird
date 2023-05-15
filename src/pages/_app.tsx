import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider as AuthProvider } from 'next-auth/react';

import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/_app.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

export const LIBRARY_CONSTANTS = {
  getLibrary: (provider: any): Web3Provider => {
    const library = new Web3Provider(
      provider,
      typeof provider.chainId === 'number'
        ? provider.chainId
        : typeof provider.chainId === 'string'
        ? parseInt(provider.chainId)
        : 'any',
    );

    return library;
  },
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout | any) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <main>
      <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
        <ToastContainer limit={1} />
        <AuthProvider session={session} refetchOnWindowFocus={false}>
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </Web3ReactProvider>
    </main>
  );
};

export default MyApp;
