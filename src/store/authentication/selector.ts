import useAuthenticationStore from './useAuthenticationStore';

export const useAuthenticationActions = () => useAuthenticationStore((state: any) => state.actions);

export const useAuthenticationAddress = () => useAuthenticationStore((state: any) => state.address);
export const useAuthenticationListAddress = () => useAuthenticationStore((state: any) => state.listAddress);
export const useAuthenticationToken = () => useAuthenticationStore((state: any) => state.token);