import useConnectionStore from './useConnectionStore';

export const useConnectionActions = () => useConnectionStore((state: any) => state.actions);

export const useConnectionConnectingWallet = () =>
    useConnectionStore((state: any) => state.isConnectingWallet);
export const useConnectionShowConnectModal = () =>
    useConnectionStore((state: any) => state.isShowConnectModal);
export const useConnectionWrongNetwork = () =>
    useConnectionStore((state: any) => state.isWrongNetwork);
export const useConnectionConnected = () =>
    useConnectionStore((state: any) => state.isConnected);