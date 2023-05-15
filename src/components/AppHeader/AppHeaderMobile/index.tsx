import { FC, useState } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Drawer, Layout, Space } from 'antd';
import classNames from 'classnames';

import AppFooter from 'components/AppFooter';

import BurgerIcon from 'resources/svg/Header/BurgerIcon';
import CloseBurgerIcon from 'resources/svg/Header/CloseBurgerIcon';
import BNBIcon from 'resources/svg/Homepage/BNBIcon';
import TelegramIcon from 'resources/svg/Homepage/TelegramIcon';
import TwitterIcon from 'resources/svg/Homepage/TwitterIcon';

import { navbarItems } from '..';

interface HeaderMobileInterface {
  toggleDrawer: () => void;
  showCloseIcon?: boolean;
  openHeader: boolean;
}

const { Header } = Layout;

const HeaderMobile = ({ toggleDrawer, openHeader }: HeaderMobileInterface) => (
  <Space>
    <div className='app-header-mobile__logo'>
      <Link href='/'>
        <Image src='/common/meme-logo.png' alt='logo' layout='fill' />
      </Link>
    </div>

    
    {!openHeader&&<BurgerIcon className='burger-icon' onClick={toggleDrawer} />}
    {openHeader&& <CloseBurgerIcon className='burger-icon' onClick={toggleDrawer} />}
  </Space>
);

const AppHeaderMobile: FC = () => {
  const router = useRouter();
  const { pathname, asPath } = router;
  const [openHeader, setOpenHeader] = useState(false);

  const toggleDrawer = () => setOpenHeader(!openHeader);

  return (
    <Header className='app-header-mobile'>
      <HeaderMobile toggleDrawer={toggleDrawer} openHeader={openHeader}/>

      <Drawer
        title={<HeaderMobile toggleDrawer={toggleDrawer} openHeader={openHeader} />}
        placement='right'
        onClose={toggleDrawer}
        closable={false}
        open={openHeader}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {navbarItems.map((navbarItem, index: number) => (
            <Link
              style={{ textAlign: 'center', padding: 20 }}
              key={index}
              onClick={() => {
                setOpenHeader(false);
              }}
              href={navbarItem.href}
              className={classNames({ activeUrl: asPath.includes(navbarItem.href) })}
            >
              {navbarItem.name}
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Space size={12}>
            <a target='_blank' href='https://t.me/bluebirdpepe' rel='noopener noreferrer'>
              <TelegramIcon />
            </a>
            <a target='_blank' href='https://twitter.com/BlueBirdPepe' rel='noopener noreferrer'>
              <TwitterIcon />
            </a>
            <BNBIcon />
          </Space>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <div style={{ textAlign: 'center' }} className='app-footer__logo'>
              <Image src='/common/meme-logo.png' alt='logo' layout='fill' />
            </div>
          </div>
          <p style={{ color: '#FFFFFF' }}>© 2023 Copyright Blue Bird Pepe all rights reserved.</p>
        </div>
      </Drawer>
    </Header>
  );
};

export default AppHeaderMobile;
