import create from 'zustand';


export interface Connection {
    isConnectingWallet: boolean;
    isShowConnectModal: boolean;
    isWrongNetwork: boolean;
    isConnected: boolean;
}

const initialState: Connection = {
    isConnectingWallet: false,
    isShowConnectModal: false,
    isWrongNetwork: false,
    isConnected: false,
};

export interface ConnectionAction {
    handleSetConnectModal: (isShowConnectModal: Connection["isShowConnectModal"]) => void;
    handleSetLoadingMetamask: (isConnectingWallet: Connection["isConnectingWallet"]) => void;
    handleSetWrongNetwork: (isWrongNetwork: Connection["isWrongNetwork"]) => void;
    handleSetConnected: (isConnected: Connection["isConnected"]) => void;

}

const useConnectionStore = create<Connection & { actions: ConnectionAction }>()((set) => ({
    //States
    ...initialState,

    //Actions
    actions: {
        handleSetConnectModal: (isShowConnectModal) => set({ isShowConnectModal }),
        handleSetLoadingMetamask: (isConnectingWallet) => set({ isConnectingWallet }),
        handleSetWrongNetwork: (isWrongNetwork) => set({ isWrongNetwork }),
        handleSetConnected: (isConnected) => set({ isConnected }),
    },
}),
);

export default useConnectionStore;
