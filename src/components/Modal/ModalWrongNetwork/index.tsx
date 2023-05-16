import { FC, useEffect } from 'react';

import selectedConnection from 'redux/connection/selector';

import { SupportedChainId } from 'connectors/constants';
import { useAppSelector } from 'hooks/useStore';

import { setupNetwork } from 'utils/wallet';

import Modal from '..';

type ModalWrongNetworkProps = {};

const ModalWrongNetwork: FC<ModalWrongNetworkProps> = () => {
  const { isWrongNetwork } = useAppSelector(selectedConnection.getConnection);

  const targetChainId = SupportedChainId.BSC;

  useEffect(() => {
    if (isWrongNetwork) {
      const switchNetwork = async () => {
        if (targetChainId) {
          await setupNetwork(targetChainId);
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
