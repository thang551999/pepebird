import { FC, Fragment, ReactNode } from 'react';

import { Modal as ModalAntd, Typography } from 'antd';

const { Title } = Typography;

const Modal: FC<{
  title?: string | ReactNode;
  onClose?: any;
  showCloseIcon?: boolean;
  open: boolean;
  width?: number | string;
  maskClosable?: boolean;
  wrapClassName?: string;
  getContainer?: any;
  destroyOnClose?: boolean;
  centered?: boolean;
  children?: any;
}> = ({ title, onClose, showCloseIcon = true, width, destroyOnClose = true, maskClosable, children, ...props }) => {
  return (
    <ModalAntd
      footer={null}
      closable={false}
      onCancel={onClose}
      width={width ?? 500}
      wrapClassName='modal'
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable || showCloseIcon}
      {...props}
    >
      <Fragment>
        <div className='modal-wrap'>
          {title && (
            <Title level={5} className='title'>
              {title}
            </Title>
          )}
          {children}
        </div>
      </Fragment>
    </ModalAntd>
  );
};

export default Modal;
