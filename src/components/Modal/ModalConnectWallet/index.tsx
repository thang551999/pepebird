import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';

import AppButton from 'components/AppButton';
import { getErrorConnectMessage } from 'connectors';
import { METAMASK, METAMASK_DEEPLINK, WALLET_CONNECT } from 'connectors/constants';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useAddressActions } from 'store/address/selector';
import {
  useConnectionActions,
  useConnectionConnectingWallet,
  useConnectionShowConnectModal,
} from 'store/connection/selector';

import MetamaskIcon from 'resources/svg/MetamaskIcon';

import Modal from '..';

declare let window: any;

const ModalConnectWallet = () => {
  const { active, deactivate, account } = useWeb3React();

  // const { isShowConnectModal, isConnectingWallet } = useAppSelector(selectedConnection.getConnection);

  const isShowConnectModal = useConnectionShowConnectModal();
  const isConnectingWallet = useConnectionConnectingWallet();

  const { handleSetConnectModal, handleSetLoadingMetamask, handleSetWrongNetwork } = useConnectionActions();
  const { handleSetConnectedWalletType } = useAddressActions();

  const handleHideModalConnectWallet = () => handleSetConnectModal(false);

  const handleCloseModalConnectWallet = () => {
    handleHideModalConnectWallet();
    handleSetConnectModal(false);
  };

  const [connectedWalletType, setConnectedWalletType] = useState('');

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  useEffect(() => {
    if (active && account && connectedWalletType) {
      handleSetConnectedWalletType(connectedWalletType);
    }
  }, [connectedWalletType, active, account]);

  const handleConnectMetamask = () => {
    handleHideModalConnectWallet();

    connectInjected(
      undefined,
      () => {
        handleSetLoadingMetamask(true);
        setConnectedWalletType(METAMASK);
      },
      () => isEthereum && handleSetLoadingMetamask(false),
    );
  };

  const handleConnectWallet = () => {
    handleHideModalConnectWallet();

    connectWalletConnect({
      failed: (err) => {
        handleSetLoadingMetamask(false);
        getErrorConnectMessage(err, deactivate);
        handleSetWrongNetwork(true);
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
