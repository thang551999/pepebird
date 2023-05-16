import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { Contract } from 'ethers';

import { useConnectionActions } from 'store/connection/selector';

import PepeBirdABI from '../../abi/PepeBirdABI.json';
import AppButton from '../AppButton';
type ConnectWalletButtonProps = { text?: string; className?: string };

const ConnectWalletButton = ({ text, className }: ConnectWalletButtonProps) => {
  const { handleSetConnectModal } = useConnectionActions();
  const { library, chainId, account, active, deactivate, activate } = useWeb3React();
  console.log({ library, chainId, account, active, deactivate, activate });
  const NFTContractAddress = '0x094De877F7e51Ee52Fa7D34B37FDb193e7c07158';
  const handleConnect = async () => {
    console.log(17777, account);
    if (!account) {
      handleSetConnectModal(true);
    } else {
      const signer = library.getSigner(account);
      const contract = new Contract(NFTContractAddress, PepeBirdABI, signer);
      console.log(account);
      const isCheck = await contract.getCheckAdress(account);
      console.log(isCheck);
      if (!isCheck) {
        const a = await contract.register();
        console.log(a);
      }
    }
  };

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
