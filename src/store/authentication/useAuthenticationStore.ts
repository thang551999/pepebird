import { omit } from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Authentication {
  address?: string;
  listAddress: any;
  token?: string;
}

export interface AuthenticationAction {
  handleSetAddress: ({ address }: Pick<Authentication, 'address'>) => void;
  handleRemoveAddress: ({ address }: Pick<Authentication, 'address'>) => void;
  handleAddAddress: ({ address, signature }: Pick<Authentication, 'address'> & { signature: string }) => void;
  handleSetToken: (token: any) => void;
}

const initialState = {
  address: '',
  listAddress: {},
  token: '',
};

const useAuthenticationStore = create<Authentication & { actions: AuthenticationAction }>()(
  persist((set) => ({
    //States
    ...initialState,

    //Actions
    actions: {
      handleSetAddress: ({ address }) => set({ address }),

      handleRemoveAddress: ({ address }) =>
        set((state): any => {
          if (address) {
            state.listAddress = omit(state?.listAddress, [address]);
          }
          state.address = '';
        }),

      handleAddAddress: ({ address, signature }) =>
        set((state): any => {
          state.address = address;

          if (address) {
            state.listAddress[address] = {
              address,
              signature,
            };
          }
        }),

      handleSetToken: ({ token }) => set({ token }),
    },
  }),
    {
      name: 'Authentication',
      partialize: ({ address, listAddress, token }) => ({ address, listAddress, token }),
    },
  ),
);

export default useAuthenticationStore;
