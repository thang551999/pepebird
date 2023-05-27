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
          <a target='_blank' href='https://t.me/bluebirdpepeofficial' rel='noopener noreferrer'>
            <TelegramIcon />
          </a>
          <a target='_blank' href='https://twitter.com/BlueBirdPepe' rel='noopener noreferrer'>
            <TwitterIcon />
          </a>
          <a
            target='_blank'
            href='https://bscscan.com/token/0x091d471d8410cb14451a45f406922f271e356283'
            rel='noopener noreferrer'
          >
            <BNBIcon />
          </a>
        </Space>
        <div style={{display:'flex', flexDirection:'row'}}>
          <Button className='btn-buy-now'>Buy Now</Button>
          <a style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'40px', marginLeft:'10px'}} href='https://www.pinksale.finance/launchpad/0x509a51E626E38D7B2956b9265318A3Bb5550C01A?chain=BSC' target='_blank' className='nft-billboard' rel="noreferrer">Presale BBPEPE</a>
        </div>
      </div>

      <div className='homepage-banner__right'>
        <Image alt='nft-image' src='/homepage/home-banner.png' layout='fill' />
      </div>
    </div>
  );
};

export default HomePageBanner;
