import create from 'zustand';


export interface Address {
    address: any;
    chainId: any;
    listAddress: any;
    connectedWalletType: any;
}

const initialState: Address = {
    address: '',
    chainId: null,
    listAddress: {},
    connectedWalletType: '',
};

export interface AddressAction {
    handleSetAddressNetwork: (address: any) => void;
    handleRemoveAddressNetwork: (chainId: Address['chainId']) => void;
    handleAddAddressNetWork: (listAddress: any) => void;
    handleSetConnectedWalletType: (connectedWalletType: Address['connectedWalletType']) => void;
}

const useAddressStore = create<Address & { actions: AddressAction }>((set) => ({
    //States
    ...initialState,

    //Actions
    actions: {
        handleSetAddressNetwork: (address) => set({ address }),
        handleRemoveAddressNetwork: (chainId) => set({ chainId }),
        handleAddAddressNetWork: (listAddress) => set({ listAddress }),
        handleSetConnectedWalletType: (connectedWalletType) => set({ connectedWalletType }),
    },
}),
);

export default useAddressStore;
