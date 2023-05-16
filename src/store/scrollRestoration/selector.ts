import useScrollRestorationStore from './useScrollRestorationStore';

export const useGetShouldScrollRestore = () => useScrollRestorationStore((state: any) => state.shouldScrollRestore);
export const useGetPreviousRoute = () => useScrollRestorationStore((state: any) => state.previousRoute);
export const useGetScrollRestorationStoreActions = () => useScrollRestorationStore((state: any) => state.actions);
