import useAddressStore from './useAddressStore';

export const useAddressActions = () => useAddressStore((state: any) => state.actions);

export const useAddress = () => useAddressStore((state: any) => state.address);
export const useAddressChainId = () => useAddressStore((state: any) => state.chainId);
export const useAddressListAddress = () => useAddressStore((state: any) => state.listAddress);
export const useAddressConnectedWalletType = () => useAddressStore((state: any) => state.connectedWalletType);

