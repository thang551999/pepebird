import React from 'react';
import Image from 'next/legacy/image';

const RoadMapSection = () => {
  return (
    <div className='roadmap-wrapper'>
      <h2>Roadmap</h2>
      <h3>Rough expectation:</h3>

      <div className='roadmap-wrapper__image'>
        <Image src='/homepage/roadmap.png' alt='roadmap' layout='fill' />
      </div>
    </div>
  );
};

export default RoadMapSection;
