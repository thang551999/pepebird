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
        <Space size={12}>
          <a target='_blank' href='https://t.me/bluebirdpepe' rel='noopener noreferrer'>
            <TelegramIcon />
          </a>
          <a target='_blank' href='https://twitter.com/BlueBirdPepe' rel='noopener noreferrer'>
            <TwitterIcon />
          </a>
          
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
