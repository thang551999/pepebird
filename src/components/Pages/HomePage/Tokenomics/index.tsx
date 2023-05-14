import React from 'react';
import Image from 'next/legacy/image';

const tokennomicsText = [
  'No tax.',
  'Renounced contract.',
  '1% for Airdrop',
  'The liquidity pool received 92.1% of the tokens.',
  'The remaining 6.9% of the supply is stored in a multi-sig wallet, exclusively for use as tokens in upcoming centralized exchange listings,marketing expenses,etc.',
  'This wallet can be easily monitored through the ENS name "bluebirdpepewallet.bsc"',
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
            <Image alt='how-to-buy' src='/homepage/tokenomics.png' layout='fill' />
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
