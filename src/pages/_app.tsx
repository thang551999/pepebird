import { ReactElement, ReactNode } from 'react';
import { useStore } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider as AuthProvider } from 'next-auth/react';

import { Web3ReactProvider } from '@web3-react/core';
import { LIBRARY_CONSTANTS } from 'constant/library';
import { namespace as AuthenticationNamespace } from 'redux/authentication/slice';
import { wrapper } from 'redux/configStore';
import { PersistGate } from 'redux-persist/integration/react';

import AppConnectWalletWrapper from 'components/AppConnectWalletWrapper';
import { getToken } from 'services/apiService';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/_app.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

const onBeforeLift = (store: any) => () => {
  const state = store.getState();
  getToken(state?.[AuthenticationNamespace]?.authenticationToken);
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout | any) => {
  const store = useStore();

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <Web3ReactProvider getLibrary={LIBRARY_CONSTANTS.getLibrary}>
      <ToastContainer limit={1} />

      {/* <AuthProvider session={session} refetchOnWindowFocus={false}> */}
      <PersistGate persistor={(store as any).__persistor} loading={null} onBeforeLift={onBeforeLift(store)}>
        <AppConnectWalletWrapper>{getLayout(<Component {...pageProps} />)}</AppConnectWalletWrapper>
      </PersistGate>
      {/* </AuthProvider> */}
    </Web3ReactProvider>
  );
};

export default wrapper.withRedux(MyApp);
