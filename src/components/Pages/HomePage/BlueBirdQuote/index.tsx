import React from 'react';

import QuoteCloseIcon from 'resources/svg/Homepage/QuoteCloseIcon';
import QuoteOpenIcon from 'resources/svg/Homepage/QuoteOpenIcon';

const BlueBirdQuoteSection = () => {
  return (
    <div className='blue-bird-wrapper'>
      <div className='open-quote'>
        <QuoteCloseIcon />
      </div>

      <p>Blue Bird Pepe: the meme coin that&apos;s chirping its way to the moon!</p>

      <div className='close-quote'>
        <QuoteOpenIcon />
      </div>
    </div>
  );
};

export default BlueBirdQuoteSection;
