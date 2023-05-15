import { FC, useState } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Drawer, Layout, Space } from 'antd';
import classNames from 'classnames';

import BurgerIcon from 'resources/svg/Header/BurgerIcon';

import { navbarItems } from '..';

interface HeaderMobileInterface {
  toggleDrawer: () => void;
  showCloseIcon?: boolean;
}

const { Header } = Layout;

const HeaderMobile = ({ toggleDrawer }: HeaderMobileInterface) => (
  <Space>
    <div className='app-header-mobile__logo'>
      <Link href='/'>
        <Image src='/common/meme-logo.png' alt='logo' layout='fill' />
      </Link>
    </div>

    <BurgerIcon className='burger-icon' onClick={toggleDrawer} />
  </Space>
);

const AppHeaderMobile: FC = () => {
  const router = useRouter();
  const { pathname } = router;

  const [openHeader, setOpenHeader] = useState(false);

  const toggleDrawer = () => setOpenHeader(!openHeader);

  return (
    <Header className='app-header-mobile'>
      <HeaderMobile toggleDrawer={toggleDrawer} />

      <Drawer
        title={<HeaderMobile toggleDrawer={toggleDrawer} />}
        placement='right'
        onClose={toggleDrawer}
        closable={false}
        open={openHeader}
      >
        {navbarItems.map((navbarItem, index: number) => (
          <Link key={index} href={navbarItem.href} className={classNames({ activeUrl: pathname === navbarItem.href })}>
            {navbarItem.name}
          </Link>
        ))}
      </Drawer>
    </Header>
  );
};

export default AppHeaderMobile;
