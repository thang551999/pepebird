import type { FC } from 'react';
import Image from 'next/legacy/image';

import { Grid, Layout } from 'antd';

const { Footer: FooterAntd } = Layout;
const { useBreakpoint } = Grid;

const AppFooter: FC = () => {
  const screens = useBreakpoint();

  return (
    <FooterAntd className='app-footer'>
      <div className='app-footer__logo'>
        <Image src='/common/meme-logo.png' alt='logo' layout='fill' />
      </div>

      <p>© 2023 Copyright Blue Bird Pepe all rights reserved.</p>
    </FooterAntd>
  );
};
export default AppFooter;
