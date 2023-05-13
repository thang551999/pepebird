import React from 'react';
import Image from 'next/legacy/image';

const AboutSection = () => {
  return (
    <div className='about-wrapper'>
      <div className='about-wrapper__image'>
        <Image alt='nft-image' src='/homepage/about.png' layout='fill' />
      </div>

      <div className='about-wrapper__description'>
        <h2>About</h2>

        <p>
          Psst, hey you. Are you into memes? Because we've got something special for you - Blue Bird PePe, the meme coin
          that's all about community.
          <br />
          <br />
          We might not be the biggest or the loudest, but what we lack in size, we make up for in heart. As a product of
          the golden age of memes, we know what it takes to bring the laughs and the love. So why not join us on this
          wild ride and see what all the fuss is about? Shh, don't tell anyone - it'll be our little secret.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
