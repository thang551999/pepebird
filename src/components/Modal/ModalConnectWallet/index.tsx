import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { handleSetConnectedWalletType } from 'redux/address/slice';
import selectedConnection from 'redux/connection/selector';
import { handleSetConnectModal, handleSetLoadingMetamask, handleSetWrongNetwork } from 'redux/connection/slice';

import AppButton from 'components/AppButton';
import { getErrorConnectMessage } from 'connectors';
import { METAMASK, METAMASK_DEEPLINK, WALLET_CONNECT } from 'connectors/constants';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';

import MetamaskIcon from 'resources/svg/MetamaskIcon';

import Modal from '..';

declare let window: any;

const ModalConnectWallet = () => {
  const dispatch = useAppDispatch();
  const { active, deactivate, account } = useWeb3React();

  const { isShowConnectModal, isConnectingWallet } = useAppSelector(selectedConnection.getConnection);

  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));

  const handleCloseModalConnectWallet = () => {
    handleHideModalConnectWallet();
    dispatch(handleSetLoadingMetamask(false));
  };

  const [connectedWalletType, setConnectedWalletType] = useState('');

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  useEffect(() => {
    if (active && account && connectedWalletType) {
      dispatch(handleSetConnectedWalletType(connectedWalletType));
    }
  }, [connectedWalletType, active, account]);

  const handleConnectMetamask = () => {
    handleHideModalConnectWallet();

    connectInjected(
      undefined,
      () => {
        dispatch(handleSetLoadingMetamask(true));
        setConnectedWalletType(METAMASK);
      },
      () => isEthereum && dispatch(handleSetLoadingMetamask(false)),
    );
  };

  const handleConnectWallet = () => {
    handleHideModalConnectWallet();

    connectWalletConnect({
      failed: (err) => {
        dispatch(handleSetLoadingMetamask(false));
        getErrorConnectMessage(err, deactivate);
        dispatch(handleSetWrongNetwork(true));
      },
    });

    setConnectedWalletType(WALLET_CONNECT);
  };

  const renderConnectWallet = () => (
    <div className='wallet-modal'>
      <p className='title'>Connect Wallet</p>
      <div className='wallet-modal__button'>
        <AppButton
          text='Metamask'
          onClick={handleConnectMetamask}
          className='wallet-modal__button--first'
          variant='default'
          prefixIcon={<MetamaskIcon width={50} height={50} />}
        />
        {/* <AppButton
          onClick={handleConnectWallet}
          className='wallet-modal__button--second'
          variant='default'
          text='Wallet Connect'
        /> */}
      </div>
    </div>
  );

  const renderWalletConnectContent = () => (
    <div className='metamask_notfound'>
      <p className='title'>Not Found</p>
      <a href='' className='link' onClick={handleConnectWallet} rel='noreferrer'>
        Re-Connected
      </a>
    </div>
  );

  const renderLoadingContent = () => (
    <div className='loading-metamask-modal'>
      <p className='title'>Connecting to Metamask</p>
    </div>
  );

  const renderMetamaskNotFoundContent = () => (
    <div className='metamask-notfound-modal'>
      <p className='title'>Not found Metamask</p>
      <div className='footer'>
        <a target='_blank' href={METAMASK_DEEPLINK} className='link' rel='noreferrer'>
          Not found Metamask
        </a>
      </div>
    </div>
  );

  const renderNoMetamask = () => (
    <div className='popup_metamask'>
      {connectedWalletType === WALLET_CONNECT
        ? renderWalletConnectContent()
        : isEthereum
        ? renderLoadingContent()
        : renderMetamaskNotFoundContent()}
    </div>
  );

  return (
    <Modal
      onClose={handleCloseModalConnectWallet}
      open={isShowConnectModal}
      showCloseIcon={isShowConnectModal || !isEthereum}
    >
      {isShowConnectModal ? renderConnectWallet() : renderNoMetamask()}
    </Modal>
  );
};

export default ModalConnectWallet;
