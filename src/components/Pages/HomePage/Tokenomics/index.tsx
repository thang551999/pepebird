import React from 'react';
import Image from 'next/legacy/image';

const tokennomicsText = [
  'No taxes, contract renouncement, and audit',
  'Airdrop: 2%',
  'Marketing: 2%',
  'Ecosystem: 6.9%',
  'Presale and liquidity: 81.1%',
  'Burn: 8%',
];

const TokenomicsSection = () => {
  return (
    <div className='tokenomics-wrapper' id='tokenomics'>
      <div className='container'>
        <h2>TOKENOMICS</h2>

        <div className='tokenomics-wrapper__supply'>
          <h3>Token Supply:</h3>
          <h3>420,690,000,000,000</h3>
        </div>

        <div className='tokenomics-wrapper__description'>
          <div className='image'>
            <Image alt='how-to-buy' src='/homepage/left.webp' layout='fill' />
          </div>

          <ul className='description'>
            {tokennomicsText.map((item, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* <div className='union-background'>
        <Image alt='nft-image' src='/homepage/bg-union2.png' layout='fill' />
      </div> */}
    </div>
  );
};

export default TokenomicsSection;
