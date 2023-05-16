import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';

import { useConnectionActions } from 'store/connection/selector';

import AppButton from '../AppButton';

type ConnectWalletButtonProps = { text?: string; className?: string };

const ConnectWalletButton = ({ text, className }: ConnectWalletButtonProps) => {
  const { handleSetConnectModal } = useConnectionActions();

  const { active } = useWeb3React();

  const handleConnect = () => handleSetConnectModal(true);

  return (
    <AppButton
      text={text || 'Connect Wallet'}
      // disabled={!active}
      onClick={handleConnect}
      className={classNames('connect-wallet__button', className)}
    />
  );
};

export default ConnectWalletButton;
