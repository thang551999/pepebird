import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { Contract } from 'ethers';

import showMessage from 'components/Message';
import { CONTRACT_ADDRESS } from 'connectors/constants';
import { useConnectionActions } from 'store/connection/selector';

import PepeBirdABI from '../../abi/PepeBirdABI.json';
import AppButton from '../AppButton';
type ConnectWalletButtonProps = { text?: string; className?: string };

const ConnectWalletButton = ({ text, className }: ConnectWalletButtonProps) => {
  const { handleSetConnectModal } = useConnectionActions();
  const { library, chainId, account, active, deactivate, activate } = useWeb3React();

  console.log('chainId', chainId);

  const handleConnect = async () => {
    console.log(17777, account);
    if (!account) {
      handleSetConnectModal(true);
    } else {
      showMessage('success', 'You already connected ');

      const signer = library.getSigner(account);
      const contract = new Contract(CONTRACT_ADDRESS, PepeBirdABI, signer);
      const isCheck = await contract.getCheckAdress(account);

      if (isCheck) {
        const res = await contract.register();
        const receipt1 = await res.wait();

        if (receipt1) {
          showMessage('success', 'Register successfully');
        } else {
          showMessage('error', 'Register failed');
        }
      }
    }
  };

  return (
    <AppButton
      text={account ? 'Register':'Connect Wallet'}
      // disabled={!active}
      onClick={handleConnect}
      className={classNames('connect-wallet__button', className)}
    />
  );
};

export default ConnectWalletButton;
