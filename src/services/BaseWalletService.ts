import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { WALLET_STATUS } from 'constant/common';
import { ethers } from 'ethers';

export function isAddress(address: string) {
  try {
    return getAddress(address);
  } catch {
    return false;
  }
}

export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library?.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || isNativeToken(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function isNativeToken(address: string) {
  return address === AddressZero;
}

export default class BaseWalletService {
  address: string | null;
  initUnit256: any;

  constructor(props: any) {
    this.address = props?.address;
  }

  verifyLoginSignature = async ({
    library,
    creator,
    cancelMetamask,
  }: {
    library: any;
    creator: string;
    cancelMetamask: () => void;
  }) => {
    let signVerify: any = null;
    let hashVerify = null;

    try {
      hashVerify = ethers.utils.solidityKeccak256(['address'], [creator]);

      const signHashBytes = ethers.utils.arrayify(hashVerify);

      if (library?.provider?.wc) {
        const wcMessage = ethers.utils.hexlify(signHashBytes);
        signVerify = await library.provider.wc.signPersonalMessage([wcMessage, creator]);
      } else {
        const signer = await library.getSigner(creator);
        signVerify = await signer.signMessage(signHashBytes);
      }
      return signVerify;
    } catch (error: any) {
      if (WALLET_STATUS.CANCEL_METAMASK === error?.code) {
        cancelMetamask && cancelMetamask();
      } else {
        return;
      }
    }
  };
}
