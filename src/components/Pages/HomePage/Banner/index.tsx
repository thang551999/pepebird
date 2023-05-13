import React from 'react';
import Image from 'next/legacy/image';

import { Button, Space } from 'antd';

import BNBIcon from 'resources/svg/Homepage/BNBIcon';
import TelegramIcon from 'resources/svg/Homepage/TelegramIcon';
import TwitterIcon from 'resources/svg/Homepage/TwitterIcon';

const HomePageBanner = () => {
  return (
    <div className='homepage-banner'>
      <div className='homepage-banner__left'>
        <h1>Blue Bird PePe</h1>
        <p>
          the most memeable memecoin in existence. The dogs have had their day, it’s time for Blue Bird PePe to take
          reign.
        </p>

        <Space size={12}>
          <TelegramIcon />
          <TwitterIcon />
          <BNBIcon />
        </Space>

        <Button className='btn-buy-now'>Buy Now</Button>
      </div>

      <div className='homepage-banner__right'>
        <Image alt='nft-image' src='/homepage/home-banner.png' layout='fill' />
      </div>
    </div>
  );
};

export default HomePageBanner;
