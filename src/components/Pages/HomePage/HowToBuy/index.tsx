import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/legacy/image';

const HowToBuyItem = [
  {
    title: 'Create a Wallet',
    desc: 'Obtain Metamask wallet or any wallet of your choice from App Store/ Google Play Store. Or use Metamask extension for Google Chrome.',
    image: '/homepage/pepe_money.png',
  },
  {
    title: 'Prepare BNB',
    desc: 'Change Network to BNB Smart Chain. Prepare BNB to swap for BBPEPE, you can obtain BNB through Metamask wallet or have them transferred to your wallet after buying them on other exchange platforms.',
    image: '/homepage/pepe_money1.png',
  },
  {
    title: 'Go to Pancakeswap',
    desc: 'copy the address of BBPEPE token (Smart contract) and paste it into search, import the token.',
    image: '/homepage/pepe_money2.png',
  },
  {
    title: 'Purchase BBPEPE token:',
    desc: 'Decide on how much BNB you want to exchange for BBPEPE token then sign the Metamask prompt. Remember to leave a little bit of BNB for future transaction fees.',
    image: '/homepage/pepe_money3.png',
  },
];

const HowToBuySection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const scrolled = winScroll;
    setScrollPosition(scrolled);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='how-to-buy-wrapper' id='how-to-buy'>
      <div
        className='how-to-buy-wrapper__image'
        style={{ marginTop: scrollPosition - 1360 < 0 ? 0 : scrollPosition - 1260 > 850 ? 850 : scrollPosition - 1260 }}
      >
        <Image alt='how-to-buy' src='/homepage/howtobuy.png' layout='fill' />
      </div>

      <div className='how-to-buy-wrapper__description'>
        <h2>How to buy</h2>

        <div className='how-to-buy-wrapper__item'>
          {HowToBuyItem.map((item, index: number) => (
            <div key={index} className='htb-item'>
              <div className='text'>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>

              <div className='image'>
                <Image alt={item.title} src={item.image} layout='fill' />
              </div>

              <div className='background' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToBuySection;
