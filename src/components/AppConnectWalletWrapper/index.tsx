import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useWeb3React } from '@web3-react/core';
import { TYPE_CONSTANTS } from 'constant';
import noop from 'lodash/noop';
import selectedAddress from 'redux/address/selector';
import { handleAddAddressNetWork, handleSetAddressNetwork, handleSetConnectedWalletType } from 'redux/address/slice';
import selectAuthentication from 'redux/authentication/selector';
import { handleSetAuthenticationToken } from 'redux/authentication/slice';
import selectedConnection from 'redux/connection/selector';
import { handleSetConnected, handleSetLoadingMetamask, handleSetWrongNetwork } from 'redux/connection/slice';

import { injected, walletConnect } from 'connectors';
import { METAMASK, SUPPORTED_CHAIN_IDS, WALLET_CONNECT } from 'connectors/constants';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import { checkSuccessRequest, getToken } from 'services/apiService';
import loginServices from 'services/login';
import MetamaskService from 'services/MetamaskService';

import { setupNetwork } from 'utils/wallet';

import showMessage from '../Message';
import ModalConnectWallet from '../Modal/ModalConnectWallet';
import ModalWrongNetwork from '../Modal/ModalWrongNetwork';

const AppConnectWalletWrapper: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { chainId, account, active, library, deactivate } = useWeb3React();

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const { isConnectingWallet } = useAppSelector(selectedConnection.getConnection);
  const { authenticationToken } = useAppSelector(selectAuthentication.getAuthenticationToken);
  const { listAddress, connectedWalletType, address } = useAppSelector(selectedAddress.getAddress);

  useEffect(() => {
    if (address && connectedWalletType && !active) {
      if (connectedWalletType === METAMASK) {
        setTimeout(() => connectInjected(), 200);
        dispatch(handleSetConnectedWalletType(METAMASK));
      }

      if (connectedWalletType === WALLET_CONNECT) {
        setTimeout(() => connectWalletConnect(), 200);
        dispatch(handleSetConnectedWalletType(WALLET_CONNECT));
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
    dispatch(handleSetWrongNetwork(isWrongNetwork));
  }, [chainId, authenticationToken]);

  useEffect(() => {
    dispatch(handleSetConnected(!!(address && account)));
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
          dispatch(
            handleAddAddressNetWork({
              address: account,
              signature,
            }),
          );
          dispatch(
            handleSetAddressNetwork({
              chainId,
              address: account,
            }),
          );
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
        dispatch(
          handleSetAddressNetwork({
            chainId,
            address: account,
          }),
        );
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
        dispatch(handleSetAuthenticationToken(token));
        success();
      } else {
        // fail();
        success();
      }
    } catch (error) {
      console.log('error :>> ', error);
    } finally {
      handleCancelLoadingMetamask();
    }
  };

  const handleCancelLoadingMetamask = () =>
    setTimeout(() => {
      dispatch(handleSetLoadingMetamask(false));
    }, 500);

  const handleDisconnect = () => {
    getToken('');
    deactivate();
    dispatch(handleSetAddressNetwork({}));
    dispatch(handleSetAuthenticationToken(''));
    walletConnect.walletConnectProvider = undefined;
    localStorage.removeItem(WALLET_CONNECT);
    localStorage.removeItem(METAMASK);
  };

  const handleLoginFailed = () => {
    handleDisconnect();
    showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'message.E3');
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
