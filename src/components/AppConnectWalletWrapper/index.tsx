import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useWeb3React } from '@web3-react/core';
import { TYPE_CONSTANTS } from 'constant';
import noop from 'lodash/noop';

import { injected, walletConnect } from 'connectors';
import { METAMASK, SUPPORTED_CHAIN_IDS, WALLET_CONNECT } from 'connectors/constants';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { checkSuccessRequest, getToken } from 'services/apiService';
import loginServices from 'services/login';
import MetamaskService from 'services/MetamaskService';
import { useAddress, useAddressActions, useAddressConnectedWalletType } from 'store/address/selector';
import {
  useAuthenticationActions,
  useAuthenticationListAddress,
  useAuthenticationToken,
} from 'store/authentication/selector';
import { useConnectionActions, useConnectionConnectingWallet } from 'store/connection/selector';

import { setupNetwork } from 'utils/wallet';

import showMessage from '../Message';
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

  // Address
  const address = useAddress();
  const connectedWalletType = useAddressConnectedWalletType();

  const authenticationToken = useAuthenticationToken();

  const isConnectingWallet = useConnectionConnectingWallet();

  const { handleSetToken } = useAuthenticationActions();
  const { handleSetAddressNetwork, handleSetConnectedWalletType, handleAddAddressNetWork } = useAddressActions();
  const { handleSetConnectModal, handleSetLoadingMetamask, handleSetWrongNetwork, handleSetConnected } =
    useConnectionActions();

  useEffect(() => {
    if (address && connectedWalletType && !active) {
      if (connectedWalletType === METAMASK) {
        setTimeout(() => connectInjected(), 200);
        handleSetConnectedWalletType(METAMASK);
      }

      if (connectedWalletType === WALLET_CONNECT) {
        setTimeout(() => connectWalletConnect(), 200);
        handleSetConnectedWalletType(WALLET_CONNECT);
      }
    }
  }, [address, connectedWalletType, active, router.query]);

  useEffect(() => {
    const setUpAddress = async () => {
      if (account) {
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
    walletConnect.on('Web3ReactDeactivate', () => {
      localStorage.removeItem(WALLET_CONNECT);
      walletConnect.walletConnectProvider = undefined;
      handleDisconnect();
    });

    injected.on('Web3ReactDeactivate', () => {
      localStorage.removeItem(METAMASK);
      handleDisconnect();
    });

    return () => {
      walletConnect.removeListener('Web3ReactDeactivate', noop);
      injected.removeListener('Web3ReactDeactivate', noop);
    };
  }, [active, account, address]);

  useEffect(() => {
    const isWrongNetwork = authenticationToken && chainId && !SUPPORTED_CHAIN_IDS.includes(chainId);
    if (isWrongNetwork) {
      handleSetWrongNetwork(isWrongNetwork);
    }
  }, [chainId, authenticationToken]);

  useEffect(() => {
    handleSetConnected(!!(address && account));
  }, [address, account]);

  const handleLoginForFirstTime = async (wallet: MetamaskService) => {
    const signature = (await wallet.verifyLoginSignature({
      creator: account as string,
      library,
      cancelMetamask: () => {
        handleDisconnect();
        handleCancelLoadingMetamask();
      },
    })) as string;

    if (signature) {
      handleLogin({
        address: account as string,
        signature,
        success: () => {
          handleAddAddressNetWork({ address: account, signature }),
            handleSetAddressNetwork({ chainId, address: account });
        },
        fail: handleLoginFailed,
      });
    } else {
      handleDisconnect();
    }
  };

  const handleLoginWithExistedAccount = async (account: string) => {
    handleLogin({
      address: account as string,
      signature: listAddress?.[account]?.signature as string,
      success: () => {
        handleSetAddressNetwork({
          chainId,
          address: account,
        });
      },
      fail: handleLoginFailed,
    });
  };

  const handleLogin = async ({
    address,
    signature,
    success,
    fail,
  }: {
    address: string;
    signature: string;
    success: () => void;
    fail: () => void;
  }) => {
    const data = {
      address,
      signature,
    };
    try {
      const response = await loginServices.handleLogin(data);
      if (checkSuccessRequest(response)) {
        const token = response?.data?.token;
        getToken(token);
        handleSetToken(token);
        success();
      } else {
        fail();
      }
    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      handleCancelLoadingMetamask();
    }
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
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E3');
    } catch (e) {
      console.log(e);
    } finally {
      handleSetAddressNetwork({ address: '' });
      handleSetToken({ token: '' });
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
