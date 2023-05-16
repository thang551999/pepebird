import { shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux/configStore';

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = (state) => useSelector(state, shallowEqual);
