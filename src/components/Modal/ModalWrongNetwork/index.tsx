import { FC, useEffect } from 'react';

import { SupportedChainId } from 'connectors/constants';
import { useConnectionActions, useConnectionWrongNetwork } from 'store/connection/selector';

import { setupNetwork } from 'utils/wallet';

import Modal from '..';

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = () => {
  const isWrongNetwork = useConnectionWrongNetwork();

  const targetChainId = SupportedChainId.BSC;

  const { handleSetWrongNetwork } = useConnectionActions();

  useEffect(() => {
    if (isWrongNetwork) {
      const switchNetwork = async () => {
        if (targetChainId) {
          await setupNetwork(targetChainId);
          handleSetWrongNetwork(false);
        }
      };

      switchNetwork();
    }
  }, [isWrongNetwork]);

  return (
    <Modal open={isWrongNetwork} maskClosable={false} showCloseIcon={false} destroyOnClose>
      <div className='wrong-network-modal'>
        <p className='title'>Wrong network</p>
      </div>
    </Modal>
  );
};

export default ModalWrongNetwork;
