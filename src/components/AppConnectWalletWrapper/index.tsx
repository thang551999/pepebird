import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useWeb3React } from '@web3-react/core';

import { walletConnect } from 'connectors';
import { METAMASK, SUPPORTED_CHAIN_IDS, WALLET_CONNECT } from 'connectors/constants';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { getToken } from 'services/apiService';
import MetamaskService from 'services/MetamaskService';
import { useAddress, useAddressActions } from 'store/address/selector';
import {
  useAuthenticationActions,
  useAuthenticationListAddress,
  useAuthenticationToken,
} from 'store/authentication/selector';
import { useConnectionActions, useConnectionConnectingWallet } from 'store/connection/selector';

import { setupNetwork } from 'utils/wallet';

import ModalConnectWallet from '../Modal/ModalConnectWallet';
import ModalWrongNetwork from '../Modal/ModalWrongNetwork';

const AppConnectWalletWrapper: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const router = useRouter();

  const { chainId, account, active, library, deactivate } = useWeb3React();

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  // Authentication
  const listAddress = useAuthenticationListAddress();
  const { handleSetToken } = useAuthenticationActions();

  // Address
  const address = useAddress();

  const authenticationToken = useAuthenticationToken();

  const isConnectingWallet = useConnectionConnectingWallet();

  const { handleSetAddressNetwork, handleAddAddressNetWork } = useAddressActions();
  const { handleSetLoadingMetamask, handleSetWrongNetwork, handleSetConnected } = useConnectionActions();

  useEffect(() => {
    const setUpAddress = async () => {
      if (account && isConnectingWallet) {
        const wallet = new MetamaskService().getInstance();
        setupNetwork(chainId, library);

        if (!listAddress?.[account]) {
          handleLoginForFirstTime(wallet);
        } else {
          handleLoginWithExistedAccount(account);
        }
      }
    };

    setUpAddress();
  }, [account, isConnectingWallet]);

  useEffect(() => {
    const isWrongNetwork = chainId && !SUPPORTED_CHAIN_IDS.includes(chainId);
    if (isWrongNetwork) {
      handleSetWrongNetwork(isWrongNetwork);
    }
  }, [chainId, authenticationToken]);

  useEffect(() => {
    handleSetConnected(!!(address && account));
  }, [address, account]);

  const handleLoginForFirstTime = async (wallet: MetamaskService) => {
    // const signature = (await wallet.verifyLoginSignature({
    //   creator: account as string,
    //   library,
    //   cancelMetamask: () => {
    //     handleDisconnect();
    //     handleCancelLoadingMetamask();
    //   },
    // })) as string;

    if (wallet) {
      handleAddAddressNetWork({ address: account });
      handleSetAddressNetwork({ chainId, address: account });
      // console.log('signature', signature);
      console.log('account', account);
    } else {
      handleDisconnect();
      handleLoginFailed();
    }
  };

  const handleLoginWithExistedAccount = async (account: string) => {
    console.log('account', account);
  };

  const handleCancelLoadingMetamask = () =>
    setTimeout(() => {
      handleSetLoadingMetamask(false);
    }, 500);

  const handleDisconnect = () => {
    getToken('');
    deactivate();
    handleSetAddressNetwork({});
    handleSetToken('');
    walletConnect.walletConnectProvider = undefined;
    localStorage.removeItem(WALLET_CONNECT);
    localStorage.removeItem(METAMASK);
  };

  const handleLoginFailed = async () => {
    try {
      handleDisconnect();
      // showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E3');
    } catch (e) {
      console.log(e);
    } finally {
      handleSetAddressNetwork({ address: '' });
      handleSetToken({ token: '' });
      handleCancelLoadingMetamask();
      console.log('wallet disconnect');
    }
  };

  return (
    <>
      {children}
      <ModalWrongNetwork />
      <ModalConnectWallet />
    </>
  );
};

export default AppConnectWalletWrapper;
