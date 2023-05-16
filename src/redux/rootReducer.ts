import AddressReducer, { namespace as AddressNamespace } from './address/slice';
import AuthenticationReducer, { namespace as AuthenticationNameSpace } from './authentication/slice';
import ConnectionReducer, { namespace as ConnectionNamespace } from './connection/slice';

const rootReducer = {
  [AddressNamespace]: AddressReducer,
  [ConnectionNamespace]: ConnectionReducer,
  [AuthenticationNameSpace]: AuthenticationReducer,
};

export default rootReducer;
