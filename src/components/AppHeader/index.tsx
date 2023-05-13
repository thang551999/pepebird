import type { FC } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Grid, Layout, Space } from 'antd';
import classNames from 'classnames';

const { Header: HeaderAntd } = Layout;
const { useBreakpoint } = Grid;

const navbarItems = [
  { name: 'About', href: '/' },
  { name: 'How to buy', href: '/about' },
  { name: 'Tokenomics', href: '/contact' },
  { name: 'Roadmap', href: '/roadmap' },
];

const Header: FC = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <HeaderAntd className='app-header'>
      <Space size={63}>
        <div className='app-header-logo'>
          <Link href='/'>
            <Image src='/common/meme-logo.png' alt='logo' layout='fill' />
          </Link>
        </div>

        <div className='app-header-menu'>
          {navbarItems.map((item, index: number) => (
            <Link key={index} href={item.href} className={classNames({ activeUrl: pathname === item.href })}>
              {item.name}
            </Link>
          ))}
        </div>
      </Space>

      <Button className='btn-buy-now'>Buy Now</Button>
    </HeaderAntd>
  );
};
export default Header;
