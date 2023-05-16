import classNames from 'classnames';
import { handleSetConnectModal } from 'redux/connection/slice';

import { useAppDispatch } from 'hooks/useStore';

import AppButton from '../AppButton';

type ConnectWalletButtonProps = { text?: string; className?: string };

const ConnectWalletButton = ({ text, className }: ConnectWalletButtonProps) => {
  const dispatch = useAppDispatch();

  const handleShowConnectModal = () => dispatch(handleSetConnectModal(true));

  return (
    <AppButton
      text={text || 'Connect Wallet'}
      onClick={handleShowConnectModal}
      className={classNames('connect-wallet__button', className)}
    />
  );
};

export default ConnectWalletButton;
